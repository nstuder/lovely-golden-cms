#!/bin/bash
# Upgrades the MongoDB data in a Docker volume step by step 4.4 -> 5.0 -> 6.0 -> 7.0 -> 8.0.
# usage: mongo-upgrade.sh <volume> <db-name>
# The mongod that normally uses the volume must be stopped before.
# Temporary containers: no published port, no network access from outside.
set -euo pipefail
VOLUME=$1
DB=$2
NAME=mongo-upgrade-step

shell() { # run JS in the temporary container, with the right shell for the version
    if docker exec "$NAME" sh -c 'command -v mongosh' > /dev/null 2>&1; then
        docker exec "$NAME" mongosh --quiet --eval "$1"
    else
        docker exec "$NAME" mongo --quiet --eval "$1"
    fi
}

counts() {
    shell "const d = db.getSiblingDB('$DB'); print(['dogs','litters','news','pages','media','galleries','users'].map(c => c + '=' + d.getCollection(c).countDocuments({})).join(' '))"
}

for step in 5.0.33:5.0 6.0.28:6.0 7.0.48:7.0 8.0.38:8.0; do
    image=mongo:${step%%:*}
    fcv=${step##*:}
    docker rm -f "$NAME" > /dev/null 2>&1 || true
    docker run -d --name "$NAME" -v "$VOLUME:/data/db" "$image" > /dev/null
    for i in $(seq 1 60); do shell 'db.adminCommand({ping:1}).ok' > /dev/null 2>&1 && break; sleep 1; done
    shell 'db.adminCommand({ping:1}).ok' > /dev/null
    confirm=""
    [ "${fcv%%.*}" -ge 7 ] && confirm=", confirm: true"
    shell "db.adminCommand({ setFeatureCompatibilityVersion: '$fcv'$confirm })" > /dev/null
    now=$(shell "db.adminCommand({getParameter:1, featureCompatibilityVersion:1}).featureCompatibilityVersion.version")
    echo "$image: fcv=$now $(counts)"
    [ "$now" = "$fcv" ] || { echo "FCV not set, stopping"; exit 1; }
done
docker exec "$NAME" mongod --version | head -1
docker stop "$NAME" > /dev/null && docker rm "$NAME" > /dev/null
echo "upgrade done"
