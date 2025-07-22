<script lang="ts">
	import MapComponent from '$lib/MapComponent.svelte';
	import LayerControls from '$lib/LayerControls.svelte';

	let mapComponent: MapComponent;
	let activeLayers: Set<string> = new Set();
	let currentNetworkType: string = 'fast';

	function handleToggleLayer(event: CustomEvent) {
		const { layerId, show } = event.detail;
		
		if (show) {
			mapComponent?.addLayer(layerId);
			activeLayers.add(layerId);
		} else {
			mapComponent?.removeLayer(layerId);
			activeLayers.delete(layerId);
		}
		
		// Trigger reactivity
		activeLayers = activeLayers;
	}

	function handleChangeNetworkType(event: CustomEvent) {
		const { networkType } = event.detail;
		currentNetworkType = networkType;
		
		// If route network is active, refresh it with new network type
		if (activeLayers.has('route-network')) {
			mapComponent?.removeLayer('route-network');
			mapComponent?.addLayer('route-network');
		}
	}
</script>

<svelte:head>
	<title>PCTNI: Propensity to Cycle Tool for Northern Ireland</title>
</svelte:head>

<div class="header">
	<h1>PCTNI: Propensity to Cycle Tool for Northern Ireland</h1>
</div>

<div class="map-layout">
	<MapComponent 
		bind:this={mapComponent}
		bind:activeLayers
		bind:currentNetworkType
	/>
	
	<LayerControls 
		{activeLayers}
		{currentNetworkType}
		on:toggleLayer={handleToggleLayer}
		on:changeNetworkType={handleChangeNetworkType}
	/>
</div>
