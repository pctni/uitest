#!/bin/bash

echo "Installing dependencies..."
deno install --allow-scripts=npm:esbuild,npm:@esbuild/win32-x64

echo "Starting development server..."
deno task dev
