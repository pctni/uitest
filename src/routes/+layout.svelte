<script>
  import 'maplibre-gl/dist/maplibre-gl.css';
  import '../app.css'; // Assuming you'll create a global CSS file
</script>

<slot />

<style>
  /* Global styles can go here or in app.css */
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
</style>
