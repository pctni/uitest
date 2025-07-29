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

echo "Downloading from GitHub release v0.0.1..."

# Create the destination directory if it doesn't exist.
mkdir -p "$DEST_DIR"

# Get the list of assets from the release and download each one
ASSETS_URL="https://api.github.com/repos/$OWNER/$REPO/releases/tags/v0.0.1"
echo "Fetching asset list from $ASSETS_URL..."

# Download and parse the assets list
curl -s "$ASSETS_URL" | \
  grep "browser_download_url" | \
  cut -d '"' -f 4 | \
  while read -r URL; do
    if [ -n "$URL" ]; then
      FILENAME=$(basename "$URL")
      echo "Downloading $FILENAME..."
      curl -L -o "$DEST_DIR/$FILENAME" "$URL"
      if [ $? -eq 0 ]; then
        echo "Successfully downloaded $FILENAME to $DEST_DIR."
      else
        echo "Error: Failed to download $FILENAME."
        exit 1
      fi
    fi
  done

echo "All files downloaded successfully."

# --- Run the rest of the original build command from netlify.toml ---
echo "Running the main build process..."
# Handle the rollup issue by removing package-lock.json and node_modules
if [ -f "package-lock.json" ]; then
  echo "Removing package-lock.json..."
  rm package-lock.json
fi

if [ -d "node_modules" ]; then
  echo "Removing node_modules..."
  rm -rf node_modules
fi

echo "Running npm install..."
npm install

echo "Running npm run build..."
npm run build