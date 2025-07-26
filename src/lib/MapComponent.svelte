<script lang="ts">
  import { MapLibre } from 'svelte-maplibre';
  import type { LngLatBoundsLike } from 'maplibre-gl';

  // Northern Ireland coordinates
  // Center approximately at the geographic center of Northern Ireland
  const center: [number, number] = [-6.5, 54.6]; // Longitude, Latitude

  // Bounding box covering mainland Northern Ireland
  // West, South, East, North
  const bounds: LngLatBoundsLike = [-8.2, 54.0, -5.2, 55.5];

  // Map style - using a clean, light basemap
  const mapStyle = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
</script>

<div class="map-container">
  <h2>🗺️ Northern Ireland Map</h2>
  <p>Interactive map centered on Northern Ireland using svelte-maplibre</p>
  
  <MapLibre
    style={mapStyle}
    {center}
    zoom={8}
    {bounds}
    fitBoundsOptions={{ padding: 20 }}
    standardControls={true}
    class="northern-ireland-map"
  />
</div>

<style>
  .map-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h2 {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  p {
    color: #666;
    text-align: center;
    margin-bottom: 2rem;
  }

  :global(.northern-ireland-map) {
    width: 100%;
    height: 600px;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.2);
  }

  /* Make the map responsive */
  @media (max-width: 768px) {
    .map-container {
      padding: 1rem;
    }
    
    :global(.northern-ireland-map) {
      height: 400px;
    }
    
    h2 {
      font-size: 1.5rem;
    }
  }
</style>
