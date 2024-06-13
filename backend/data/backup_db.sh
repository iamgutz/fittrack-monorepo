#!/bin/bash

# Variables
CONTAINER_NAME="fittrack-api_web_1"
DB_PATH_IN_CONTAINER="/app/data/db.sqlite3"  # Update this with the path to your database file in the container
GIT_REPO_DIR="/var/www/fittrack-api"  # Update this with the path to your Git repository
BACKUP_DIR="$GIT_REPO_DIR/data"  # Update this with your desired backup directory
READABLE_TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
 
# Create the backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Create a backup file
BACKUP_TARGET_FILE="$BACKUP_DIR/db.sqlite3"

# Change to the Git repository directory
cd "$GIT_REPO_DIR"

# Switch to the dev branch
git checkout dev

# Get the latests from dev, command sets the default pull strategy to rebase
git pull origin dev --rebase

docker cp "$CONTAINER_NAME:$DB_PATH_IN_CONTAINER" "$BACKUP_TARGET_FILE"

# Add any updated files
git add .

# Create a commit with the message "db backup"
git commit -m "db backup - $READABLE_TIMESTAMP"

# Push to the dev branch
git push origin dev