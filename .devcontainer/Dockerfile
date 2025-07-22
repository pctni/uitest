# Use the official Deno Debian image as base
FROM denoland/deno:debian

# Install sudo and other necessary packages
RUN apt-get update && apt-get install -y \
    sudo \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Ensure the deno user exists and has a proper home directory
RUN id -u deno &>/dev/null || useradd -m -s /bin/bash deno

# Create home directory if it doesn't exist and set proper permissions
RUN mkdir -p /home/deno && chown -R deno:deno /home/deno

# Add deno user to sudo group (for potential administrative tasks)
RUN usermod -aG sudo deno

# Allow deno user to run sudo without password (optional, for convenience)
RUN echo "deno ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

# Set the working directory
WORKDIR /workspace

# Switch to deno user
USER deno

# Set HOME environment variable
ENV HOME=/home/deno

# Verify deno installation
RUN deno --version
