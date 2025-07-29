#!/bin/bash

echo "🚀 Building SvelteKit site for Netlify deployment..."

# Run SvelteKit build
npm run build

# Ensure the build directory exists and contains expected files
if [ ! -d "build" ]; then
    echo "❌ ERROR: SvelteKit build directory 'build' not found!"
    exit 1
fi

echo "📦 Copying static files to build directory..."
# Copy static assets (like pmtiles) to the build output
# SvelteKit's adapter-static typically puts assets in `build/` or `build/static/`
# We need to ensure the pmtiles file is accessible at the root of the deployed site
# or adjust the path in the Svelte component accordingly.
# For adapter-static, static files are usually copied to the root of the output directory.
# Let's assume `static/route_network_fastest.pmtiles` needs to be at `build/route_network_fastest.pmtiles`
# or `build/static/route_network_fastest.pmtiles` depending on SvelteKit's static asset handling.
# The SvelteKit default is to put static files directly in the output folder.
cp static/route_network_fastest.pmtiles build/route_network_fastest.pmtiles

echo "✅ Verifying build..."
if [ ! -f "build/index.html" ]; then
    echo "❌ ERROR: SvelteKit build did not produce index.html"
    exit 1
fi

if [ ! -f "build/route_network_fastest.pmtiles" ]; then
    echo "❌ ERROR: PMTiles file not found in build output!"
    exit 1
fi

echo "📊 Build summary:"
echo "  Build output size: $(du -sh build | awk '{print $1}')"
echo "  PMTiles size: $(ls -lh build/route_network_fastest.pmtiles | awk '{print $5}')"

echo "🎉 Build complete! Ready for Netlify deployment."
