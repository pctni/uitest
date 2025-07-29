<script>
  import MapComponent from '$lib/MapComponent.svelte';
</script>

<svelte:head>
  <title>Northern Ireland Map</title>
  <meta name="description" content="Interactive Northern Ireland mapping application" />
</svelte:head>

<main>
  <h1>Northern Ireland Map</h1>
  <p>Interactive mapping application with cycling data</p>
  <MapComponent />
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
