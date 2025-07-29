#!/bin/bash
# build.sh

# Exit on any error
set -e

# --- Install gh CLI if not present ---
if ! type -p gh >/dev/null; then
  echo "GitHub CLI not found. Installing..."
  # Try to install gh without sudo using npm if available
  if type -p npm >/dev/null; then
    echo "Installing gh via npm..."
    npm install -g gh
  else
    # Fallback to direct download if npm is not available
    echo "npm not found, attempting direct download..."
    # Determine architecture
    ARCH=$(uname -m)
    case $ARCH in
      x86_64)
        GH_ARCH="amd64"
        ;;
      aarch64|arm64)
        GH_ARCH="arm64"
        ;;
      *)
        echo "Unsupported architecture: $ARCH"
        exit 1
        ;;
    esac
    
    # Download and extract gh
    curl -L "https://github.com/cli/cli/releases/latest/download/gh_$(curl -s https://api.github.com/repos/cli/cli/releases/latest | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')_linux_$GH_ARCH.tar.gz" | tar xz
    # Move to a location in PATH
    mv gh_*/bin/gh /usr/local/bin/gh
    # Clean up
    rm -rf gh_*
  fi
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