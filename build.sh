#!/bin/bash

echo "🚀 Building site for Netlify deployment..."

# Create build directory
mkdir -p build

echo "📁 Creating build directory..."

# Check if source files exist
if [ ! -f "ni-map.html" ]; then
    echo "❌ ERROR: ni-map.html not found!"
    exit 1
fi

if [ ! -d "static" ]; then
    echo "❌ ERROR: static directory not found!"
    exit 1
fi

echo "📄 Copying ni-map.html as index.html..."
cp ni-map.html build/index.html

echo "📦 Copying static files..."
cp -r static build/

# Verify the build
echo "✅ Verifying build..."
if [ ! -f "build/index.html" ]; then
    echo "❌ ERROR: Failed to copy index.html"
    exit 1
fi

if [ ! -d "build/static" ]; then
    echo "❌ ERROR: Failed to copy static directory"
    exit 1
fi

if [ ! -f "build/static/route_network_fastest.pmtiles" ]; then
    echo "❌ ERROR: PMTiles file not found in build"
    exit 1
fi

echo "📊 Build summary:"
echo "  Index file: $(ls -lh build/index.html | awk '{print $5}')"
echo "  Static files: $(find build/static -type f | wc -l) files"
echo "  PMTiles size: $(ls -lh build/static/route_network_fastest.pmtiles | awk '{print $5}')"

echo "🎉 Build complete! Ready for Netlify deployment."
