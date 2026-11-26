#!/bin/bash
# One-time: Payload connects with its own MongoDB user (readWrite on its database only)
# instead of the root user. Run from the project directory on the server.
#
#   1. moves MONGO_INITDB_ROOT_* from .env to mongo.env (only the mongo container gets them)
#   2. creates (or resets the password of) the user "payload" in the database "payload"
#   3. points MONGODB_URI in .env to that user
#
# Afterwards: docker compose up -d mongo payload
set -euo pipefail
DB=payload
APP_USER=payload
cd "$(dirname "$0")/.."
[ -f .env ] || { echo ".env not found"; exit 1; }
umask 077

stamp=$(date +%Y%m%d_%H%M%S)
cp .env ".env.bak-$stamp"
[ -f mongo.env ] && cp mongo.env "mongo.env.bak-$stamp"

if [ ! -f mongo.env ]; then
    grep -E '^MONGO_INITDB_ROOT_(USERNAME|PASSWORD)=' .env > mongo.env
    grep -vE '^MONGO_INITDB_ROOT_(USERNAME|PASSWORD)=' .env > .env.tmp && mv .env.tmp .env
    echo "root credentials moved to mongo.env"
fi
ROOT_USER=$(grep -E '^MONGO_INITDB_ROOT_USERNAME=' mongo.env | cut -d= -f2- | tr -d '\r')
ROOT_PASSWORD=$(grep -E '^MONGO_INITDB_ROOT_PASSWORD=' mongo.env | cut -d= -f2- | tr -d '\r')
[ -n "$ROOT_USER" ] && [ -n "$ROOT_PASSWORD" ] || { echo "root credentials missing in mongo.env"; exit 1; }

APP_PASSWORD=$(openssl rand -hex 24)
MONGO=$(docker compose ps -q mongo)
[ -n "$MONGO" ] || { echo "mongo container not running"; exit 1; }

# JS for mongosh; credentials via environment, not on the command line (ps)
read -r -d '' JS <<'MONGOJS' || true
const { APP_USER, APP_PASSWORD, DB } = process.env
const appDb = db.getSiblingDB(DB)
const roles = [{ role: 'readWrite', db: DB }]
if (appDb.getUser(APP_USER)) {
    appDb.updateUser(APP_USER, { pwd: APP_PASSWORD, roles })
    print(`user ${APP_USER} updated`)
} else {
    appDb.createUser({ user: APP_USER, pwd: APP_PASSWORD, roles })
    print(`user ${APP_USER} created`)
}
MONGOJS
docker exec -e ROOT_USER="$ROOT_USER" -e ROOT_PASSWORD="$ROOT_PASSWORD" \
    -e APP_USER="$APP_USER" -e APP_PASSWORD="$APP_PASSWORD" -e DB="$DB" -e JS="$JS" "$MONGO" \
    sh -c 'mongosh --quiet -u "$ROOT_USER" -p "$ROOT_PASSWORD" --authenticationDatabase admin --eval "$JS"'

URI="mongodb://$APP_USER:$APP_PASSWORD@mongo:27017/$DB?authSource=$DB"
grep -vE '^MONGODB_URI=' .env > .env.tmp && echo "MONGODB_URI=$URI" >> .env.tmp && mv .env.tmp .env

# the new user can log in and read
docker exec -e URI="${URI/@mongo:/@localhost:}" "$MONGO" sh -c 'mongosh --quiet "$URI" --eval "db.pages.countDocuments()"' \
    | sed 's/^/pages: /'
echo "done, backups of the old files: .env.bak-$stamp"
