#!/bin/bash
# build.sh

# Exit on any error
set -e

# --- Download PMTiles from GitHub Release ---
# The GitHub repository to fetch the release from.
OWNER="pctni"
REPO="uitest"
# The destination directory for the downloaded file.
DEST_DIR="static"

echo "Downloading from GitHub release v0.0.1..."

# Create the destination directory if it doesn't exist.
mkdir -p "$DEST_DIR"

# --- Install GitHub CLI without sudo ---
echo "Installing GitHub CLI..."
# Define the version and architecture for the GitHub CLI
GH_VERSION="2.49.0" # Using a specific version for consistency
GH_ARCH="amd64"
GH_OS="linux"
GH_TARBALL="gh_${GH_VERSION}_${GH_OS}_${GH_ARCH}.tar.gz"
GH_URL="https://github.com/cli/cli/releases/download/v${GH_VERSION}/${GH_TARBALL}"

# Download and extract the GitHub CLI
curl -L -o "${GH_TARBALL}" "${GH_URL}"
mkdir -p gh_cli
tar -xzf "${GH_TARBALL}" -C gh_cli --strip-components=1
rm "${GH_TARBALL}"

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