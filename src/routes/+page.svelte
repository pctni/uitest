<script>
  import Map from '$lib/components/Map.svelte';
  import Legend from '$lib/components/Legend.svelte';
  import LayerToggle from '$lib/components/LayerToggle.svelte';

  let showRouteNetwork = true;

  function toggleRouteNetwork() {
    showRouteNetwork = !showRouteNetwork;
  }
</script>

<svelte:head>
  <title>Northern Ireland Map</title>
  <meta name="description" content="Interactive Northern Ireland mapping application" />
</svelte:head>

<main>
  <h1>Northern Ireland Map</h1>
  <p>Interactive mapping application</p>
  <div class="map-section">
    <Map layerVisible={showRouteNetwork} />
    <Legend />
    <LayerToggle visible={showRouteNetwork} onToggle={toggleRouteNetwork} />
  </div>
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

  .map-section {
    position: relative; /* Needed for absolute positioning of legend and toggle */
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
