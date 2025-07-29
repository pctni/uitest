<script lang="ts">
  import { MapLibre, FullScreenControl, GeolocateControl, ScaleControl } from 'svelte-maplibre-gl';
</script>

<MapLibre class="h-[calc(100vh-100px)]" style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json">
  <FullScreenControl position="top-left" />
  <GeolocateControl position="top-left" />
  <ScaleControl position="bottom-left" unit="metric" maxWidth=200/>
</MapLibre>