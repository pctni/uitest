#!/usr/bin/env -S deno run --allow-read --allow-write

// Simple build script that creates a working static site
import { existsSync } from "jsr:@std/fs/exists";

console.log("🚀 Building simple static site...");

// Create build directory
if (!existsSync("./build")) {
  await Deno.mkdir("./build");
}

// Simple HTML template with inline map
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Northern Ireland Map</title>
    <link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.css">
    <script src="https://unpkg.com/maplibre-gl@4/dist/maplibre-gl.js"></script>
    <script src="https://unpkg.com/pmtiles@3/dist/pmtiles.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f8f9fa;
            padding: 2rem 1rem;
        }
        h1 { 
            color: #333; 
            font-size: 2rem; 
            text-align: center; 
            margin-bottom: 0.5rem; 
        }
        p { 
            color: #666; 
            text-align: center; 
            margin-bottom: 2rem; 
        }
        #map { 
            width: 100%; 
            max-width: 1200px; 
            height: 600px; 
            margin: 0 auto; 
            border-radius: 8px; 
            border: 1px solid #ddd; 
        }
        @media (max-width: 768px) { 
            #map { height: 400px; }
        }
    </style>
</head>
<body>
    <h1>Northern Ireland Map</h1>
    <p>Interactive mapping application with cycling data</p>
    <div id="map"></div>

    <script>
        // Set up PMTiles protocol
        const protocol = new pmtiles.Protocol();
        maplibregl.addProtocol("pmtiles", protocol.tile);
        
        // Initialize map
        const map = new maplibregl.Map({
            container: 'map',
            style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
            center: [-6.5, 54.6],
            zoom: 8,
            bounds: [-8.2, 54.0, -5.2, 55.5],
            fitBoundsOptions: { padding: 20 }
        });
        
        // Add navigation controls
        map.addControl(new maplibregl.NavigationControl());
        
        // Add PMTiles layer when map loads
        map.on('load', () => {
            try {
                map.addSource('pmtiles-source', {
                    type: 'vector',
                    url: 'pmtiles://static/route_network_fastest.pmtiles'
                });
                
                map.addLayer({
                    id: 'cycling-routes',
                    type: 'line',
                    source: 'pmtiles-source',
                    'source-layer': 'routes',
                    paint: {
                        'line-color': '#3b82f6',
                        'line-width': 2,
                        'line-opacity': 0.8
                    }
                });
            } catch (error) {
                console.warn('PMTiles setup failed:', error);
            }
        });
    </script>
</body>
</html>`;

// Write the HTML file
await Deno.writeTextFile("./build/index.html", html);

// Copy static files
if (existsSync("./static")) {
  const copyCommand = new Deno.Command("powershell", {
    args: ["-Command", "Copy-Item -Path './static' -Destination './build/static' -Recurse -Force"],
    stdout: "inherit",
    stderr: "inherit"
  });
  await copyCommand.output();
}

console.log("✅ Build complete!");
console.log("📁 Files created:");
console.log("  - build/index.html");
if (existsSync("./build/static")) {
  console.log("  - build/static/ (copied from static/)");
}

console.log("\n🎉 Ready for deployment!");
console.log("📝 Build directory contains everything needed for Netlify.");
