#!/bin/bash

# --- Configuration ---
# Run this script from the project directory (where docker-compose.yml and .env are).
# Containers are looked up by their docker-compose service name, so the actual
# container names (e.g. "lovely-golden-payload-1") don't matter.
WEB_SERVICE="payload"                         # The service where your .env is
MONGO_SERVICE="mongo"                         # Your MongoDB service
IMAGE_VOLUME_PATH="/home/node/media"          # The path inside your web container to the image directory volume
BACKUP_DIR="$HOME/backups/lovely-golden"      # Directory on your host machine to store backups
# ---------------------

# Exit immediately if a command exits with a non-zero status
set -eo pipefail

WEB_CONTAINER_NAME=$(docker compose ps -q "$WEB_SERVICE")
MONGO_CONTAINER_NAME=$(docker compose ps -q "$MONGO_SERVICE")
if [ -z "$WEB_CONTAINER_NAME" ] || [ -z "$MONGO_CONTAINER_NAME" ]; then
    echo "🚨 ERROR: containers for services '$WEB_SERVICE' / '$MONGO_SERVICE' not running. Run this script from the project directory. Aborting."
    exit 1
fi

# 1. Ensure the backup directory exists
echo "Ensuring backup directory exists at: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Generate a timestamp for the backup file
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 2. Extract MongoDB credentials from the .env file
echo "Extracting MongoDB credentials from .env file..."

# This uses grep and awk to find the lines for the user and password,
# and then extracts the value after the '=' sign.
# The root user lives in mongo.env (only the mongo container gets it), formerly in .env
MONGO_ENV_FILE=mongo.env
[ -f "$MONGO_ENV_FILE" ] || MONGO_ENV_FILE=.env
MONGO_USERNAME=$(grep -E 'MONGO_INITDB_ROOT_USERNAME=' "$MONGO_ENV_FILE" | cut -d '=' -f 2- | tr -d '\r')
MONGO_PASSWORD=$(grep -E 'MONGO_INITDB_ROOT_PASSWORD=' "$MONGO_ENV_FILE" | cut -d '=' -f 2- | tr -d '\r')
MONGO_DATABASE="payload"

if [ -z "$MONGO_USERNAME" ] || [ -z "$MONGO_PASSWORD" ] || [ -z "$MONGO_DATABASE" ]; then
    echo "🚨 ERROR: MONGO_USERNAME or MONGO_PASSWORD or MONGO_DATABASE not found or empty in .env. Aborting."
    exit 1
fi

# 3. MongoDB Backup (Dump)
# We use docker exec to run mongodump inside the Mongo container.
# The credentials are passed as environment variables *only* to the mongodump process.
# The dump is created as an archive file compressed with gzip and piped to the host.

MONGO_BACKUP_FILE="$BACKUP_DIR/mongo_dump_$TIMESTAMP.archive.gz"
echo "Starting MongoDB dump for database '$MONGO_DATABASE' to $MONGO_BACKUP_FILE..."

docker exec "$MONGO_CONTAINER_NAME" sh -c \
  "mongodump --authenticationDatabase admin \
             --username $MONGO_USERNAME \
             --password $MONGO_PASSWORD \
             --db $MONGO_DATABASE \
             --archive" \
| gzip > "$MONGO_BACKUP_FILE"

echo "✅ MongoDB backup complete."

# 4. Image Volume Backup (Filesystem)
# We use docker exec to run tar inside the web container to compress the image directory.
# We then use docker cp to copy the compressed archive to the host.

IMAGE_ARCHIVE_NAME="images_backup_$TIMESTAMP.tar.gz"
IMAGE_ARCHIVE_PATH_IN_CONTAINER="/tmp/$IMAGE_ARCHIVE_NAME"

echo "Starting image volume backup from $IMAGE_VOLUME_PATH..."

# Create a gzipped tar archive of the image volume inside the container's /tmp
docker exec "$WEB_CONTAINER_NAME" sh -c \
  "tar -czf $IMAGE_ARCHIVE_PATH_IN_CONTAINER -C $(dirname $IMAGE_VOLUME_PATH) $(basename $IMAGE_VOLUME_PATH)"

# Copy the archive from the container to the host backup directory
docker cp "$WEB_CONTAINER_NAME:$IMAGE_ARCHIVE_PATH_IN_CONTAINER" "$BACKUP_DIR/$IMAGE_ARCHIVE_NAME"

# Clean up the temporary archive inside the container
docker exec "$WEB_CONTAINER_NAME" rm "$IMAGE_ARCHIVE_PATH_IN_CONTAINER"

echo "✅ Image volume backup complete."

# 5. Final Confirmation
echo "-------------------------------------"
echo "🚀 Backup successful!"
echo "Files located in: $BACKUP_DIR"
echo "  - Database: $(basename $MONGO_BACKUP_FILE)"
echo "  - Images: $(basename $IMAGE_ARCHIVE_NAME)"
echo "-------------------------------------"
