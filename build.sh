#!/bin/bash
# build.sh

# Exit on any error
set -e

# --- Download PMTiles from GitHub Release ---
# The GitHub repository to fetch the release from.
OWNER="YOUR_GITHUB_OWNER"
REPO="YOUR_GITHUB_REPO"
# The destination directory for the downloaded file.
DEST_DIR="static"
# The filename we are looking for.
FILE_NAME="route_network_fastest.pmtiles"
DEST_FILE="$DEST_DIR/$FILE_NAME"

# Check if the file already exists to avoid unnecessary downloads.
if [ -f "$DEST_FILE" ]; then
  echo "$DEST_FILE already exists. Skipping download."
else
  echo "PMTiles file not found. Downloading from GitHub release v0.0.1..."
  
  # Create the destination directory if it doesn't exist.
  mkdir -p "$DEST_DIR"
  
  # Download the specific asset from release v0.0.1 using curl
  curl -L -o "$DEST_FILE" "https://github.com/$OWNER/$REPO/releases/download/v0.0.1/$FILE_NAME"
  
  if [ $? -eq 0 ]; then
    echo "Successfully downloaded $FILE_NAME to $DEST_DIR."
  else
    echo "Error: Failed to download the file."
    exit 1
  fi
fi

# --- Run the rest of the original build command from netlify.toml ---
echo "Running the main build process..."
npm run build