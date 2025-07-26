<script>
  import MapComponent from '$lib/MapComponent.svelte';
  
  let count = 0;
  let time = new Date().toLocaleTimeString();

  // Update time every second
  setInterval(() => {
    time = new Date().toLocaleTimeString();
  }, 1000);

  function increment() {
    count += 1;
  }
</script>

<svelte:head>
  <title>Deno + Svelte + MapLibre</title>
  <meta name="description" content="A Svelte app with Northern Ireland mapping powered by Deno" />
</svelte:head>

<main>
  <div class="hero-section">
    <h1>🦕 Deno + Svelte + MapLibre</h1>
    
    <div class="card">
      <p class="time">Current time: {time}</p>
      
      <button on:click={increment}>
        Count: {count}
      </button>
      
      <p class="description">
        Interactive mapping application with <strong>Northern Ireland</strong> focus,<br/>
        powered by <strong>Deno</strong>, <strong>Svelte</strong>, and <strong>MapLibre</strong>!
      </p>
    </div>

    <div class="links">
      <a href="https://deno.land/manual" target="_blank">Deno Manual</a>
      <a href="https://kit.svelte.dev/docs" target="_blank">SvelteKit</a>
      <a href="https://maplibre.org/" target="_blank">MapLibre</a>
    </div>
  </div>

  <MapComponent />
</main>

<style>
  main {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  .hero-section {
    text-align: center;
    padding: 2rem 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: white;
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 2rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .time {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 1rem;
    font-family: 'Courier New', monospace;
  }

  button {
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%);
    border: none;
    border-radius: 8px;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 1rem 0;
  }

  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .description {
    color: #555;
    line-height: 1.6;
    margin-top: 1.5rem;
  }

  .links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
  }

  .links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
  }

  .links a:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .hero-section {
      padding: 1.5rem 1rem;
    }
    
    .card {
      padding: 1.5rem;
      margin: 1.5rem 0;
    }
    
    .links {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
