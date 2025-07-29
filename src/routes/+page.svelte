<script lang="ts">
  import { onMount } from 'svelte';
  import { MapLibre, FullScreenControl, GeolocateControl, ScaleControl } from 'svelte-maplibre-gl';
  import type { Map, LayerSpecification, StyleSpecification } from 'maplibre-gl';
  import { browser } from '$app/environment';
  import { PMTilesProtocol } from '@svelte-maplibre-gl/pmtiles';

  // --- State ---
  let showPmtiles = $state(false);
  let map: Map | undefined = $state();
  const pmtilesBounds: [number, number, number, number] = [-7.815460, 54.049760, -5.447300, 55.220990];
  
  // --- Reactive Style ---
  let style: StyleSpecification | null = $state(null);

  // --- PMTiles Definitions ---
  const pmtilesSourceId = 'pmtiles-source';
  const pmtilesLayerId = 'route-network';
  const pmtilesLayer: LayerSpecification = {
    id: pmtilesLayerId,
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

  // --- Load the complete style once on mount ---
  onMount(() => {
    if (!browser) return;
    
    const baseStyleUrl = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
    
    fetch(baseStyleUrl)
      .then(res => res.json())
      .then(baseStyleObject => {
        const pmtilesUrl = new URL('/route_network_fastest.pmtiles', window.location.origin).toString();
        
        // Always add the PMTiles source and layer to the style
        const sources = {
          ...baseStyleObject.sources,
          [pmtilesSourceId]: {
            type: 'vector',
            url: `pmtiles://${pmtilesUrl}`,
            attribution: 'PCTNI'
          }
        };
        
        // Add the PMTiles layer before the first symbol layer to ensure it's visible
        const firstSymbolId = baseStyleObject.layers.find(layer => layer.type === 'symbol')?.id;
        const layers = [...baseStyleObject.layers];
        const pmtilesLayerWithBeforeId = {
          ...pmtilesLayer,
          beforeId: firstSymbolId
        };
        
        // Insert the PMTiles layer at the beginning to ensure it's visible
        layers.push(pmtilesLayerWithBeforeId);
      
        // Set the complete style object
        style = { ...baseStyleObject, sources, layers };
      })
      .catch(err => {
        console.error('Failed to load map style:', err);
      });
  });

  // --- Toggle layer visibility ---
  $effect(() => {
    if (map && map.isStyleLoaded() && map.getLayer(pmtilesLayerId)) {
      map.setLayoutProperty(pmtilesLayerId, 'visibility', showPmtiles ? 'visible' : 'none');
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

{#if style}
  <MapLibre
    class="h-[calc(100vh-100px)]"
    {style}
    bind:map
    bounds={pmtilesBounds}
    fitBoundsOptions={{ padding: 20 }}
  >
    <FullScreenControl position="top-left" />
    <GeolocateControl position="top-left" />
    <ScaleControl position="bottom-left" unit="metric" maxWidth={200}/>
  </MapLibre>
{/if}

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