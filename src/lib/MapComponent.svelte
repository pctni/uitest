<script lang="ts">
  import { MapLibre } from 'svelte-maplibre';
  import type { LngLatBoundsLike } from 'maplibre-gl';
  import { onMount } from 'svelte';

  const center: [number, number] = [-6.5, 54.6];
  const bounds: LngLatBoundsLike = [-8.2, 54.0, -5.2, 55.5];
  const mapStyle = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
  
  let mapInstance: any;
  
  onMount(async () => {
    if (mapInstance) {
      try {
        // Import PMTiles and set up protocol
        const { Protocol } = await import('pmtiles');
        const protocol = new Protocol();
        mapInstance.addProtocol("pmtiles", protocol.tile);
        
        // Add PMTiles source and layer
        mapInstance.on('load', () => {
          mapInstance.addSource('pmtiles-source', {
            type: 'vector',
            url: 'pmtiles://static/route_network_fastest.pmtiles'
          });
          
          mapInstance.addLayer({
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
        });
      } catch (error) {
        console.warn('PMTiles setup failed:', error);
      }
    }
  });
</script>

<div class="map-container">
  <MapLibre
    bind:map={mapInstance}
    style={mapStyle}
    {center}
    zoom={8}
    {bounds}
    fitBoundsOptions={{ padding: 20 }}
    standardControls={true}
    class="map"
  />
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
