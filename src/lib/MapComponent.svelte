<script lang="ts">
  import { MapLibre } from 'svelte-maplibre';
  import type { LngLatBoundsLike } from 'maplibre-gl';

  const center: [number, number] = [-6.5, 54.6];
  const bounds: LngLatBoundsLike = [-8.2, 54.0, -5.2, 55.5];
  const mapStyle = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
</script>

<div class="map-container">
  <MapLibre
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
