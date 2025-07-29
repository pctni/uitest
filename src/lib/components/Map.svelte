<script lang="ts">
  import MapLibre from 'svelte-maplibre/MapLibre.svelte';
  import VectorTileSource from 'svelte-maplibre/VectorTileSource.svelte';
  import LineLayer from 'svelte-maplibre/LineLayer.svelte';
  import { onMount } from 'svelte';
  import type { LngLatBoundsLike, Map as MapLibreMap } from 'maplibre-gl';
  import * as pmtiles from 'pmtiles';

  // Map configuration
  const center: [number, number] = [-6.5, 54.6];
  const bounds: LngLatBoundsLike = [-8.2, 54.0, -5.2, 55.5];
  const mapStyle = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
  const pmtilesUrl = '/route_network_fastest.pmtiles';
  
  // Layer visibility state
  export let layerVisible = true;
  
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

  let mapInstance: MapLibreMap;

  onMount(() => {
    // Initialize PMTiles protocol
    const protocol = new pmtiles.Protocol();
    (window as any).maplibregl.addProtocol("pmtiles", protocol.tile);
  });

  function handleMapLoad(event: CustomEvent) {
    mapInstance = event.detail.map;
    console.log('Map loaded successfully:', mapInstance);

    // Add markers for major Northern Ireland cities
    const cities = [
        { name: 'Belfast', coordinates: [-5.93, 54.60] },
        { name: 'Derry/Londonderry', coordinates: [-7.32, 55.00] }
    ];

    cities.forEach(city => {
        const popup = new (window as any).maplibregl.Popup({ offset: 25 })
            .setText(city.name);

        new (window as any).maplibregl.Marker()
            .setLngLat(city.coordinates)
            .setPopup(popup)
            .addTo(mapInstance);
    });
  }

  function handleLayerClick(e: CustomEvent) {
    const properties = e.detail.features[0].properties;
    const volume = properties.all_fastest_bicycle_go_dutch || 'Unknown';
    
    new (window as any).maplibregl.Popup()
        .setLngLat(e.detail.lngLat)
        .setHTML(`
            <div style="font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 8px 0; font-size: 14px;">Route Network</h3>
                <p style="margin: 0;"><strong>Daily Cycling Volume:</strong> ${volume} trips</p>
            </div>
        `)
        .addTo(mapInstance);
  }

  function handleMouseEnter() {
    if (mapInstance) {
      mapInstance.getCanvas().style.cursor = 'pointer';
    }
  }

  function handleMouseLeave() {
    if (mapInstance) {
      mapInstance.getCanvas().style.cursor = '';
    }
  }

  $: if (mapInstance && mapInstance.getLayer('route-network-layer')) {
    mapInstance.setLayoutProperty('route-network-layer', 'visibility', layerVisible ? 'visible' : 'none');
  }
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
    on:mapload={handleMapLoad}
  >
    <VectorTileSource
      url={`pmtiles://${pmtilesUrl}`}
      id="route-network-source"
    >
      <LineLayer
        id="route-network-layer"
        source-layer="zcta" <!-- Assuming 'zcta' is the source-layer name from the example -->
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
        on:click={handleLayerClick}
        on:mouseenter={handleMouseEnter}
        on:mouseleave={handleMouseLeave}
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