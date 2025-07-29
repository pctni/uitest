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
    OWNER="YOUR_GITHUB_OWNER"
    REPO="YOUR_GITHUB_REPO"
    # The destination directory for the downloaded file.
    DEST_DIR="static"

    echo "Downloading from GitHub release v0.0.1..."
    # Define the path to the gh executable
    GH_BIN="./gh_cli/bin/gh"

    # Verify the installation
    "$GH_BIN" --version

    # --- Download release assets using gh CLI ---
    echo "Downloading release assets with gh CLI..."
    # Use the gh CLI to download all assets from the specified tag.
    # The GITHUB_TOKEN environment variable should be set in Netlify for private repos.
    "$GH_BIN" release download v0.0.1 \
      --repo "$OWNER/$REPO" \
      --dir "$DEST_DIR" \
      --clobber # Overwrite existing files

    # Clean up the downloaded gh_cli directory
    rm -rf gh_cli

    echo "All files downloaded successfully."
else
    echo "Not running on Linux - skipping PMTiles download"
fi

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