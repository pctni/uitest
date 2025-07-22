<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let activeLayers: Set<string> = new Set();
	export let currentNetworkType: string = 'fast';

	let activeTab = 'route-network';

	function switchTab(tabName: string) {
		activeTab = tabName;
	}

	function toggleLayer(layerId: string, show: boolean) {
		dispatch('toggleLayer', { layerId, show });
	}

	function changeNetworkType(networkType: string) {
		currentNetworkType = networkType;
		dispatch('changeNetworkType', { networkType });
	}
</script>

<div class="legend-panel">
	<h3>Layer controls</h3>
	
	<div class="tab-container">
		<div class="tab-nav">
			<button 
				class="tab-button" 
				class:active={activeTab === 'route-network'}
				on:click={() => switchTab('route-network')}
			>
				Route network
			</button>
			<button 
				class="tab-button" 
				class:active={activeTab === 'cycle-network'}
				on:click={() => switchTab('cycle-network')}
			>
				Cycle Network
			</button>
			<button 
				class="tab-button" 
				class:active={activeTab === 'coherent-network'}
				on:click={() => switchTab('coherent-network')}
			>
				Coherent network
			</button>
			<button 
				class="tab-button" 
				class:active={activeTab === 'gap-analysis'}
				on:click={() => switchTab('gap-analysis')}
			>
				Gap analysis
			</button>
			<button 
				class="tab-button" 
				class:active={activeTab === 'other-layers'}
				on:click={() => switchTab('other-layers')}
			>
				Other Layers
			</button>
		</div>

		<!-- Route Network Tab -->
		{#if activeTab === 'route-network'}
			<div class="tab-content">
				<div class="control-group">
					<div class="layer-toggle">
						<input 
							type="checkbox" 
							id="show-layer-route"
							checked={activeLayers.has('route-network')}
							on:change={(e) => toggleLayer('route-network', e.currentTarget.checked)}
						/>
						<label for="show-layer-route">Show layer</label>
					</div>
				</div>
				
				<div class="control-group">
					<label for="network-type">Network type</label>
					<select 
						id="network-type" 
						bind:value={currentNetworkType}
						on:change={(e) => changeNetworkType(e.currentTarget.value)}
					>
						<option value="fast">Fast</option>
						<option value="quiet">Quiet</option>
					</select>
				</div>
				
				<div class="legend-item">
					<h4>Cycling potential (Go Dutch)</h4>
					<div class="legend-color-item">
						<div class="legend-color-box" style="background-color: #808080;"></div>
						<span>1-49</span>
					</div>
					<div class="legend-color-item">
						<div class="legend-color-box" style="background-color: #ffff00;"></div>
						<span>50-99</span>
					</div>
					<div class="legend-color-item">
						<div class="legend-color-box" style="background-color: #80ff00;"></div>
						<span>100-249</span>
					</div>
					<div class="legend-color-item">
						<div class="legend-color-box" style="background-color: #00ffff;"></div>
						<span>250-499</span>
					</div>
					<div class="legend-color-item">
						<div class="legend-color-box" style="background-color: #80c0ff;"></div>
						<span>500-999</span>
					</div>
					<div class="legend-color-item">
						<div class="legend-color-box" style="background-color: #0080ff;"></div>
						<span>1000-1999</span>
					</div>
					<div class="legend-color-item">
						<div class="legend-color-box" style="background-color: #0000ff;"></div>
						<span>2000-2999</span>
					</div>
					<div class="legend-color-item">
						<div class="legend-color-box" style="background-color: #ff00ff;"></div>
						<span>3000+</span>
					</div>
				</div>
			</div>
		{/if}

		<!-- Placeholder tabs for other layers -->
		{#if activeTab === 'cycle-network'}
			<div class="tab-content">
				<p>Cycle network controls coming soon...</p>
			</div>
		{/if}

		{#if activeTab === 'coherent-network'}
			<div class="tab-content">
				<p>Coherent network controls coming soon...</p>
			</div>
		{/if}

		{#if activeTab === 'gap-analysis'}
			<div class="tab-content">
				<p>Gap analysis controls coming soon...</p>
			</div>
		{/if}

		{#if activeTab === 'other-layers'}
			<div class="tab-content">
				<p>Other layers controls coming soon...</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.legend-panel {
		width: 25vw;
		height: 100vh;
		background-color: #f8f9fa;
		border-left: 2px solid #dee2e6;
		overflow-y: auto;
		padding: 0;
		box-sizing: border-box;
		margin: 0;
		font-family: Arial, sans-serif;
	}

	.legend-panel h3 {
		color: #333;
		font-size: 18px;
		margin: 0;
		padding: 20px 20px 15px 20px;
		border-bottom: 2px solid #dee2e6;
		background-color: #fff;
	}

	.tab-container {
		background-color: #fff;
	}

	.tab-nav {
		display: flex;
		border-bottom: 1px solid #dee2e6;
		background-color: #f8f9fa;
	}

	.tab-button {
		flex: 1;
		padding: 12px 8px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 12px;
		font-weight: bold;
		color: #666;
		border-bottom: 3px solid transparent;
		transition: all 0.3s ease;
	}

	.tab-button:hover {
		background-color: #e9ecef;
		color: #333;
	}

	.tab-button.active {
		color: #0066cc;
		border-bottom-color: #0066cc;
		background-color: #fff;
	}

	.tab-content {
		padding: 20px;
	}

	.control-group {
		margin-bottom: 20px;
	}

	.control-group label {
		display: block;
		font-weight: bold;
		color: #333;
		margin-bottom: 8px;
		font-size: 14px;
	}

	.control-group select {
		width: 100%;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 13px;
		background-color: #fff;
	}

	.legend-item {
		margin-bottom: 20px;
		padding: 12px;
		background: #f8f9fa;
		border-radius: 6px;
		border: 1px solid #dee2e6;
	}

	.legend-item h4 {
		color: #495057;
		font-size: 14px;
		margin: 0 0 12px 0;
		font-weight: bold;
	}

	.layer-toggle {
		margin-bottom: 8px;
	}

	.layer-toggle input[type="checkbox"] {
		margin-right: 8px;
	}

	.layer-toggle label {
		font-weight: normal;
		cursor: pointer;
		font-size: 13px;
		color: #666;
	}

	.legend-color-item {
		display: flex;
		align-items: center;
		margin-bottom: 6px;
		font-size: 12px;
	}

	.legend-color-box {
		width: 18px;
		height: 12px;
		margin-right: 8px;
		border: 1px solid #999;
		border-radius: 2px;
	}
</style>
