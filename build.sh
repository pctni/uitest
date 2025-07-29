#!/bin/bash
# build.sh

# Exit on any error
set -e

# Function to detect if we're on Linux
is_linux() {
    [[ "$(uname)" == "Linux" ]]
}

# Function to detect if we're on Windows/PowerShell
is_windows() {
    [[ "$(uname)" == "MINGW"* ]] || [[ "$(uname)" == "MSYS"* ]] || [[ "$(uname)" == "CYGWIN"* ]]
}

# Only run download code on Linux (not on Windows/PowerShell)
if is_linux; then
    echo "Running on Linux - downloading PMTiles files..."
    
    # --- Download PMTiles from GitHub Release ---
    # The GitHub repository to fetch the release from.
    OWNER="pctni"
    REPO="uitest"
    # The destination directory for the downloaded file.
    DEST_DIR="static"

    echo "Downloading from GitHub release v0.0.1..."

    # Create the destination directory if it doesn't exist.
    mkdir -p "$DEST_DIR"

    # Install gh cli tool if not already installed
    if ! command -v gh &> /dev/null; then
        echo "gh command not found, installing..."
        if command -v apt-get &> /dev/null; then
            apt-get install gh -y
        elif command -v yum &> /dev/null; then
            yum install gh -y
        else
            echo "Package manager not supported. Please install gh manually."
            exit 1
        fi
    fi
    # Download the PMTiles file from the latest release
    gh release download --repo "$OWNER/$REPO" --pattern "*.pmtiles" --dir "$DEST_DIR" --latest

else
    echo "Not running on Linux - skipping PMTiles download"
fi

# --- Run the rest of the original build command from netlify.toml ---
echo "Running the main build process..."
# Handle the rollup issue by removing package-lock.json and node_modules
if [ -f "package-lock.json" ]; then
  echo "Removing package-lock.json..."
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