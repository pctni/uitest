<script lang="ts">
  import { MapLibre, FullScreenControl, GeolocateControl, ScaleControl } from 'svelte-maplibre-gl';
  import type { LayerSpecification, SourceSpecification, StyleSpecification } from 'maplibre-gl';
  import { browser } from '$app/environment';
  import { PMTilesProtocol } from '@svelte-maplibre-gl/pmtiles';

  // --- State ---
  let showPmtiles = $state(false);
  const pmtilesBounds: [number, number, number, number] = [-7.815460, 54.049760, -5.447300, 55.220990];
  
  // --- Reactive Style ---
  let style: StyleSpecification = $state({
      version: 8,
      sources: {},
      layers: []
  });

  // --- PMTiles Definitions ---
  const pmtilesSourceId = 'pmtiles-source';
  const pmtilesLayer: LayerSpecification = {
    id: 'route-network',
    source: pmtilesSourceId,
    'source-layer': 'route_network_fastest_2025-06',
    minzoom: 6,
    maxzoom: 13,
    type: 'line',
    paint: {
      'line-color': '#880000',
      'line-width': 2
    }
  };

  // --- Reactive Logic ---
  $effect(() => {
    const baseStyleUrl = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
    
    if (browser) {
      // Fetch the base style from Carto CDN
      fetch(baseStyleUrl)
        .then(res => res.json())
        .then(baseStyleObject => {
          let sources = baseStyleObject.sources;
          let layers = baseStyleObject.layers;

          if (showPmtiles) {
            const pmtilesUrl = new URL('/route_network_fastest.pmtiles', window.location.origin).toString();
            // Add PMTiles source and layer if the toggle is on
            sources = {
              ...sources,
              [pmtilesSourceId]: {
                type: 'vector',
                url: `pmtiles://${pmtilesUrl}`,
                attribution: 'PCTNI'
              }
            };
            layers = [...layers, pmtilesLayer];
          }

          // Update the style object reactively
          style = { ...baseStyleObject, sources, layers };
        });
    }
  });

</script>

{#if browser}
  <PMTilesProtocol />
{/if}

<div class="controls">
  <label>
    <input type="checkbox" bind:checked={showPmtiles} />
    Show PCTNI Network
  </label>
</div>

<MapLibre
  class="h-[calc(100vh-100px)]"
  {style}
  bounds={pmtilesBounds}
  fitBoundsOptions={{ padding: 20 }}
>
  <FullScreenControl position="top-left" />
  <GeolocateControl position="top-left" />
  <ScaleControl position="bottom-left" unit="metric" maxWidth={200}/>
</MapLibre>

<style>
  .controls {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 10;
    background: white;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-family: sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .controls input {
    margin-right: 6px;
  }
</style>