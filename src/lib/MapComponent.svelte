<script lang="ts">
	import { onMount } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import type { Map } from 'maplibre-gl';

	export let activeLayers: Set<string> = new Set();
	export let currentNetworkType: string = 'fast';

	let mapContainer: HTMLDivElement;
	let map: Map;

	// PMTiles protocol setup
	onMount(async () => {
		// Import PMTiles dynamically
		const pmtiles = await import('pmtiles');
		
		// Initialize PMTiles protocol
		const protocol = new pmtiles.Protocol();
		maplibregl.addProtocol('pmtiles', protocol.tile);

		// Basemap styles
		const basemapStyles = {
			gray: {
				version: 8,
				sources: {
					'esri-gray': {
						type: 'raster',
						tiles: ['https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'],
						tileSize: 256,
						attribution: '© Esri'
					}
				},
				layers: [{ id: 'esri-gray', type: 'raster', source: 'esri-gray' }]
			}
		};

		// Initialize map
		map = new maplibregl.Map({
			container: mapContainer,
			style: basemapStyles.gray,
			center: [-6.5, 54.6],
			zoom: 8
		});

		// Add map controls
		map.addControl(new maplibregl.NavigationControl(), 'top-left');
		map.addControl(new maplibregl.FullscreenControl(), 'top-left');
		map.addControl(new maplibregl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true
		}), 'top-left');

		// Set bounds for Northern Ireland
		map.on('load', () => {
			map.fitBounds([
				[-8.2, 53.9], // Southwest
				[-5.4, 55.3]  // Northeast
			]);
		});

		return () => {
			map?.remove();
		};
	});

	// Add layer function
	function addLayer(layerId: string) {
		if (!map || !layerId || activeLayers.has(layerId)) return;
		
		console.log(`Adding layer: ${layerId}`);
		
		let sourceId: string;
		let sourceConfig: any;
		let sourceLayerOptions: string[];

		if (layerId === 'route-network') {
			sourceId = `route-network-${currentNetworkType}`;
			if (currentNetworkType === 'fast') {
				sourceConfig = {
					type: 'vector',
					url: `pmtiles://route_network_fastest.pmtiles`
				};
				sourceLayerOptions = ['route_network_fastest'];
			}
		}

		if (!sourceConfig) {
			console.error(`Unknown layer ID: ${layerId}`);
			return;
		}

		// Add source if not exists
		if (!map.getSource(sourceId)) {
			map.addSource(sourceId, sourceConfig);
		}

		// Try to add layer with source layer options
		for (const sourceLayer of sourceLayerOptions) {
			try {
				const layerName = `${sourceId}-${sourceLayer}`;
				
				let paintProps = {};
				if (layerId === 'route-network' && currentNetworkType === 'fast') {
					paintProps = {
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
						'line-width': [
							'interpolate',
							['linear'],
							['zoom'],
							6, 0.4,
							8, 1,
							10, 2,
							12, 4,
							14, 8,
							16, 14,
							18, 24
						],
						'line-opacity': 1
					};
				}

				map.addLayer({
					id: layerName,
					type: 'line',
					source: sourceId,
					'source-layer': sourceLayer,
					paint: paintProps
				});

				// Add click handler
				map.on('click', layerName, (e) => {
					new maplibregl.Popup()
						.setLngLat(e.lngLat)
						.setHTML(`<div><strong>Properties:</strong><br>${
							Object.entries(e.features[0].properties)
								.map(([k, v]) => `${k}: ${v}`)
								.join('<br>')
						}</div>`)
						.addTo(map);
				});

				// Add hover effect
				map.on('mouseenter', layerName, () => {
					map.getCanvas().style.cursor = 'pointer';
				});

				map.on('mouseleave', layerName, () => {
					map.getCanvas().style.cursor = '';
				});

				activeLayers.add(layerId);
				console.log(`Successfully added layer: ${layerName}`);
				break;
			} catch (error) {
				console.warn(`Failed to add layer with source-layer ${sourceLayer}:`, error);
			}
		}
	}

	// Remove layer function
	function removeLayer(layerId: string) {
		if (!activeLayers.has(layerId)) return;

		const sourceId = layerId === 'route-network' ? `route-network-${currentNetworkType}` : layerId;
		
		// Find and remove layers with this source
		const layers = map.getStyle().layers;
		layers.forEach((layer: any) => {
			if (layer.source === sourceId) {
				map.removeLayer(layer.id);
			}
		});

		// Remove source if no other layers use it
		if (map.getSource(sourceId)) {
			map.removeSource(sourceId);
		}

		activeLayers.delete(layerId);
		console.log(`Removed layer: ${layerId}`);
	}

	// Export functions for parent component
	export { addLayer, removeLayer };
</script>

<!-- MapLibre CSS import -->
<svelte:head>
	<link rel="stylesheet" href="https://unpkg.com/maplibre-gl@4.1.2/dist/maplibre-gl.css" />
</svelte:head>

<div bind:this={mapContainer} class="map-container"></div>

<style>
	.map-container {
		width: 75vw;
		height: 100vh;
	}
</style>
