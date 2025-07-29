#!/bin/bash
# build.sh

# Exit on any error
set -e

# --- Install gh CLI if not present ---
if ! type -p gh >/dev/null; then
  echo "GitHub CLI not found. Installing..."
  (type -p wget >/dev/null || (sudo apt update && sudo apt install wget -y)) \
	&& sudo mkdir -p -m 755 /etc/apt/keyrings \
	&& out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
	&& cat $out | sudo tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& sudo chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& sudo mkdir -p -m 755 /etc/apt/sources.list.d \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
	&& sudo apt update \
	&& sudo apt install gh -y
  echo "GitHub CLI installed successfully."
else
  echo "GitHub CLI is already installed."
fi

# --- Download PMTiles from GitHub Release ---
# The GitHub repository to fetch the release from.
OWNER="YOUR_GITHUB_OWNER"
REPO="YOUR_GITHUB_REPO"
# The destination directory for the downloaded file.
DEST_DIR="static"

echo "Downloading from GitHub release v0.0.1..."
  
# Create the destination directory if it doesn't exist.
mkdir -p "$DEST_DIR"

# Download all assets from release v0.0.1
gh release download v0.0.1 --repo "$OWNER/$REPO" --dir "$DEST_DIR"

if [ $? -eq 0 ]; then
  echo "Successfully downloaded files to $DEST_DIR."
else
  echo "Error: Failed to download the files."
  exit 1
fi

# --- Run the rest of the original build command from netlify.toml ---
echo "Running the main build process..."
npm run build