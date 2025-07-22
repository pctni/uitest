<script>
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
	<title>Deno + Svelte App</title>
	<meta name="description" content="A Svelte app powered by Deno" />
</svelte:head>

<main>
	<h1>🦕 Deno + Svelte</h1>
	
	<div class="card">
		<p class="time">Current time: {time}</p>
		
		<button on:click={increment}>
			Count: {count}
		</button>
		
		<p class="description">
			This Svelte app is powered by <strong>Deno</strong>!<br/>
			Using Deno's npm compatibility to run SvelteKit.
		</p>
	</div>

	<div class="links">
		<a href="https://deno.land/manual" target="_blank">Deno Manual</a>
		<a href="https://kit.svelte.dev/docs" target="_blank">SvelteKit Docs</a>
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 640px;
		margin: 0 auto;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	h1 {
		color: #1a1a1a;
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 2rem;
	}

	.card {
		background: white;
		border-radius: 12px;
		padding: 2rem;
		margin: 2rem 0;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border: 1px solid #e1e5e9;
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
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
	}

	.links a {
		color: #667eea;
		text-decoration: none;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border: 2px solid #667eea;
		border-radius: 6px;
		transition: all 0.3s ease;
	}

	.links a:hover {
		background: #667eea;
		color: white;
		transform: translateY(-1px);
	}

	@media (max-width: 480px) {
		h1 {
			font-size: 2rem;
		}
		
		.card {
			padding: 1.5rem;
		}
		
		.links {
			flex-direction: column;
			align-items: center;
		}
	}
</style>
