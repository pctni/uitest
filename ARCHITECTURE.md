# SvelteKit Refactoring Architecture Plan

## Overview
This document outlines the architecture for refactoring the current Northern Ireland map application to use the latest SvelteKit with svelte-maplibre components, removing Deno, and maintaining all existing functionality including the clickable route network layer with PMTiles data.

## Current State Analysis
The current application is a hybrid setup with:
- A standalone `ni-map.html` file containing the main map functionality with complex JavaScript
- A basic SvelteKit app structure in the `src` directory
- Deno as the runtime for the development server
- PMTiles data for route network visualization
- Netlify for deployment

## Goals
1. Migrate to standard SvelteKit with latest version
2. Remove Deno dependencies
3. Use svelte-maplibre components instead of direct MapLibre GL JS
4. Maintain all existing functionality:
   - Clickable route network layer
   - Cycling volume color coding
   - Layer toggle
   - Legend
   - Responsive design
5. Ensure proper Netlify deployment

## Architecture Components

### 1. SvelteKit Configuration
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
```

### 2. Project Structure
```
src/
├── lib/
│   ├── components/
│   │   ├── Map.svelte
│   │   ├── Legend.svelte
│   │   └── LayerToggle.svelte
│   └── data/
│       └── pmtiles.js
├── routes/
│   ├── +layout.svelte
│   └── +page.svelte
static/
└── route_network_fastest.pmtiles
```

### 3. Map Component
The main map component will use svelte-maplibre to create the map with PMTiles source:

```svelte
<script lang="ts">
  import MapLibre from 'svelte-maplibre/MapLibre.svelte';
  import VectorTileSource from 'svelte-maplibre/VectorTileSource.svelte';
  import LineLayer from 'svelte-maplibre/LineLayer.svelte';
  import type { LngLatBoundsLike } from 'maplibre-gl';

  // Map configuration
  const center: [number, number] = [-6.5, 54.6];
  const bounds: LngLatBoundsLike = [-8.2, 54.0, -5.2, 55.5];
  const mapStyle = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
  const pmtilesUrl = '/route_network_fastest.pmtiles';
  
  // Layer visibility state
  let layerVisible = true;
  
  // Color coding for cycling volume
  const volumeColors = {
    '3000+': '#ff00ff',    // Magenta
    '2000-2999': '#0000ff', // Dark Blue
    '1000-1999': '#0080ff', // Blue
    '500-999': '#80c0ff',   // Light Blue
    '250-499': '#00ffff',   // Cyan
    '100-249': '#80ff00',   // Light Green
    '50-99': '#ffff00',     // Yellow
    '<50': '#808080'        // Gray
  };
</script>

<div class="map-container">
  <MapLibre
    style={mapStyle}
    {center}
    zoom={10}
    {bounds}
    fitBoundsOptions={{ padding: 20 }}
    standardControls={true}
    class="map"
  >
    <VectorTileSource
      url={`pmtiles://${pmtilesUrl}`}
    >
      <LineLayer
        id="route-network-layer"
        paint={{
          'line-color': [
            'interpolate',
            ['linear'],
            ['get', 'all_fastest_bicycle_go_dutch'],
            1, volumeColors['<50'],
            49, volumeColors['<50'],
            50, volumeColors['50-99'],
            99, volumeColors['50-99'],
            100, volumeColors['100-249'],
            249, volumeColors['100-249'],
            250, volumeColors['250-499'],
            499, volumeColors['250-499'],
            500, volumeColors['500-999'],
            999, volumeColors['500-999'],
            1000, volumeColors['1000-1999'],
            1999, volumeColors['1000-1999'],
            2000, volumeColors['2000-2999'],
            2999, volumeColors['2000-2999'],
            3000, volumeColors['3000+']
          ],
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            6, 0.4,
            8, 1,
            10, 2,
            12, 4,
            14, 8,
            16, 14,
            18, 24
          ],
          'line-opacity': 1,
          'line-blur': 0
        }}
        layout={{
          'visibility': layerVisible ? 'visible' : 'none'
        }}
        on:click={(e) => {
          const properties = e.features[0].properties;
          const volume = properties.all_fastest_bicycle_go_dutch || 'Unknown';
          
          // Create popup with route information
          // This will be implemented in the component
        }}
      />
    </VectorTileSource>
  </MapLibre>
</div>

<style>
  .map-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  :global(.map) {
    width: 100%;
    height: 600px;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  /* Override map control styles to be black and white */
  :global(.maplibregl-ctrl-group) {
    background: white !important;
    border: 1px solid #ccc !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  }

  :global(.maplibregl-ctrl-group button) {
    background: white !important;
    color: #333 !important;
    border: none !important;
  }

  :global(.maplibregl-ctrl-group button:hover) {
    background: #f5f5f5 !important;
    color: #000 !important;
  }

  :global(.maplibregl-ctrl-group button:disabled) {
    background: #f9f9f9 !important;
    color: #ccc !important;
  }

  @media (max-width: 768px) {
    :global(.map) {
      height: 400px;
    }
  }
</style>
```

### 4. Legend Component
```svelte
<script lang="ts">
  // Define volume ranges and colors
  const volumeRanges = [
    { min: 3000, max: null, color: '#ff00ff', label: '3000+ trips/day' },
    { min: 2000, max: 2999, color: '#0000ff', label: '2000-2999 trips/day' },
    { min: 1000, max: 1999, color: '#0080ff', label: '1000-1999 trips/day' },
    { min: 500, max: 999, color: '#80c0ff', label: '500-999 trips/day' },
    { min: 250, max: 499, color: '#00ffff', label: '250-499 trips/day' },
    { min: 100, max: 249, color: '#80ff00', label: '100-249 trips/day' },
    { min: 50, max: 99, color: '#ffff00', label: '50-99 trips/day' },
    { min: 0, max: 49, color: '#808080', label: '<50 trips/day' }
  ];
</script>

<div class="legend">
  <h4>Cycling Volume</h4>
  {#each volumeRanges as range}
    <div class="legend-item">
      <div class="legend-color" style="background-color: {range.color}"></div>
      <span>{range.label}</span>
    </div>
  {/each}
</div>

<style>
  .legend {
    position: absolute;
    bottom: 30px;
    left: 10px;
    background: white;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 12px;
    z-index: 1000;
    max-width: 200px;
  }

  .legend h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
    font-weight: bold;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .legend-color {
    width: 20px;
    height: 3px;
    margin-right: 8px;
    border-radius: 1px;
  }
</style>
```

### 5. Layer Toggle Component
```svelte
<script lang="ts">
  export let visible = true;
  export function onToggle() {}
</script>

<div class="layer-control">
  <label>
    <input type="checkbox" bind:checked={visible} on:change={onToggle}>
    Route Network Layer
  </label>
</div>

<style>
  .layer-control {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    z-index: 1000;
  }

  .layer-control label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .layer-control input[type="checkbox"] {
    margin-right: 8px;
  }
</style>
```

### 6. Main Page
```svelte
<script>
  import Map from '$lib/components/Map.svelte';
  import Legend from '$lib/components/Legend.svelte';
  import LayerToggle from '$lib/components/LayerToggle.svelte';
</script>

<svelte:head>
  <title>Northern Ireland Map</title>
  <meta name="description" content="Interactive Northern Ireland mapping application" />
</svelte:head>

<main>
  <h1>Northern Ireland Map</h1>
  <p>Interactive mapping application</p>
  <Map />
  <Legend />
  <LayerToggle />
</main>

<style>
  main {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f8f9fa;
    min-height: 100vh;
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
</style>
```

## Implementation Plan

### Phase 1: Setup and Configuration
1. Create SvelteKit configuration file
2. Update package.json to remove Deno dependencies
3. Install required dependencies (svelte-maplibre, maplibre-gl, pmtiles)
4. Configure Vite for PMTiles protocol

### Phase 2: Component Migration
1. Migrate map functionality to svelte-maplibre components
2. Implement clickable route network layer
3. Create legend component
4. Implement layer toggle functionality

### Phase 3: Testing and Deployment
1. Test all functionality locally
2. Verify PMTiles range requests work correctly
3. Update Netlify configuration
4. Test deployment

## PMTiles Considerations
- PMTiles requires range requests to work properly
- Netlify configuration must include proper headers for PMTiles files
- The pmtiles.js library must be initialized to handle the pmtiles:// protocol
- Range requests must be supported by the server (Netlify does support this)

## Netlify Configuration
The netlify.toml file already has proper configuration for PMTiles files:
```toml
[[headers]]
  for = "/static/*.pmtiles"
  [headers.values]
    Content-Type = "application/octet-stream"
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, HEAD, OPTIONS"
    Access-Control-Allow-Headers = "Range, Content-Range, Accept-Ranges"
    Accept-Ranges = "bytes"
    Cache-Control = "public, max-age=31536000"
```

## Migration Steps
1. Remove Deno-specific files (deno.json, dev.ts, server.ts)
2. Create SvelteKit configuration
3. Migrate map functionality to Svelte components
4. Update build process
5. Test locally
6. Deploy to Netlify