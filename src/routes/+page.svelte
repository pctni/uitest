<script lang="ts">
  import { 
    MapLibre, 
    FullScreenControl, 
    GeolocateControl, 
    ScaleControl,
    VectorTileSource,
    LineLayer,
    CustomControl
  } from 'svelte-maplibre-gl';
  import { PMTilesProtocol } from '@svelte-maplibre-gl/pmtiles';
  import { browser } from '$app/environment';

  // --- State ---
  let showPmtiles = $state(false);
  const pmtilesBounds: [number, number, number, number] = [-7.815460, 54.049760, -5.447300, 55.220990];
  const pmtilesUrl = '/route_network_fastest.pmtiles';

</script>

{#if browser}
  <PMTilesProtocol />
{/if}

<MapLibre
  class="h-[calc(100vh-100px)]"
  style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
  bounds={pmtilesBounds}
  fitBoundsOptions={{ padding: 20 }}
>
  <FullScreenControl position="top-left" />
  <GeolocateControl position="top-left" />
  <ScaleControl position="bottom-left" unit="metric" maxWidth={200}/>

  <CustomControl position="top-right">
    <div class="map-overlay">
      <label>
        <input type="checkbox" bind:checked={showPmtiles} />
        Show Network
      </label>
    </div>
  </CustomControl>

  {#if showPmtiles}
    <VectorTileSource 
      id="pmtiles-source" 
      url={"pmtiles://" + pmtilesUrl} 
      attribution="PCTNI"
    >
      <LineLayer
        sourceLayer="route_network_fastest_2025-06"
        paint={{
          'line-color': [
            'interpolate',
            ['linear'],
            ['get', 'all_fastest_bicycle_go_dutch'],
            1, '#808080',
            49, '#808080',
            50, '#ffff00',
            99, '#ffff00',
            100, '#80ff00',
            249, '#80ff00',
            250, '#00ffff',
            499, '#00ffff',
            500, '#80c0ff',
            999, '#80c0ff',
            1000, '#0080ff',
            1999, '#0080ff',
            2000, '#0000ff',
            2999, '#0000ff',
            3000, '#ff00ff'
          ],
          'line-width': 2
        }}
        minzoom={6}
        maxzoom={13}
      />
    </VectorTileSource>
  {/if}
</MapLibre>


<style>
  .map-overlay {
    background: white;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-family: sans-serif;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .map-overlay input {
    margin-right: 6px;
  }
</style>