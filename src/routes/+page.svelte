<script lang="ts">
  import { 
    MapLibre, 
    FullScreenControl, 
    GeolocateControl, 
    ScaleControl,
    VectorTileSource,
    LineLayer,
    FillLayer,
    CustomControl,
    NavigationControl
  } from 'svelte-maplibre-gl';
  import { PMTilesProtocol } from '@svelte-maplibre-gl/pmtiles';
  import { browser } from '$app/environment';
  import type { StyleSpecification } from 'maplibre-gl';
  
  // --- State ---
  let showBasemapPanel = $state(false);
  let showLayersPanel = $state(false);
  let currentBasemap = $state('gray');
  let currentNetworkType = $state('fast');
  
  // Layer states
  let showRouteNetwork = $state(false);
  let showCoherentNetwork = $state(false);
  let showCycleNetwork = $state(false);
  let showGapAnalysis = $state(false);
  let showLocalAuthorities = $state(false);
  
  const pmtilesBounds: [number, number, number, number] = [-7.815460, 54.049760, -5.447300, 55.220990];
  
  // Basemap styles
  const basemapStyles: Record<string, string | StyleSpecification> = {
    'gray': {
      version: 8 as const,
      sources: { 
        'esri-gray': { 
          type: 'raster', 
          tiles: ['https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'], 
          tileSize: 256, 
          attribution: '© Esri' 
        } 
      },
      layers: [{ id: 'esri-gray', type: 'raster', source: 'esri-gray' }]
    },
    'streets': 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    'cycling': {
      version: 8 as const,
      sources: { 
        'cyclosm-raster': { 
          type: 'raster', 
          tiles: [
            'https://a.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', 
            'https://b.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', 
            'https://c.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png'
          ], 
          tileSize: 256, 
          attribution: '© CyclOSM | Map data: © OpenStreetMap contributors' 
        } 
      },
      layers: [{ id: 'cyclosm-raster', type: 'raster', source: 'cyclosm-raster' }]
    }
  };

  // Get current basemap style
  function getCurrentBasemapStyle() {
    return basemapStyles[currentBasemap] || basemapStyles.gray;
  }

  // Toggle functions
  function toggleBasemapPanel() {
    showBasemapPanel = !showBasemapPanel;
    if (showBasemapPanel) showLayersPanel = false;
  }

  function toggleLayersPanel() {
    showLayersPanel = !showLayersPanel;
    if (showLayersPanel) showBasemapPanel = false;
  }

  function selectBasemap(styleKey: string) {
    currentBasemap = styleKey;
    showBasemapPanel = false;
  }

  function changeNetworkType(type: string) {
    currentNetworkType = type;
  }
</script>

{#if browser}
  <PMTilesProtocol />
{/if}

<MapLibre
  class="h-[calc(100vh-100px)]"
  style={getCurrentBasemapStyle()}
  bounds={pmtilesBounds}
  fitBoundsOptions={{ padding: 20 }}
>
  <NavigationControl position="top-left" />
  <FullScreenControl position="top-left" />
  <GeolocateControl position="top-left" />
  <ScaleControl position="bottom-left" unit="metric" maxWidth={200}/>

  <!-- Custom Controls for Basemap -->
  <CustomControl position="top-left">
    <button
      class="basemap-button-large"
      title="Change basemap"
      on:click={toggleBasemapPanel}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
        <path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882z"/>
        <path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0z"/>
      </svg>
    </button>
  </CustomControl>

  <!-- Custom Control for Layers Button -->
  <CustomControl position="top-right">
    <button
      class="layers-button"
      title="Toggle layers"
      on:click={toggleLayersPanel}
    >
      <span>Map Layers</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
        viewBox="0 0 16 16"
        class="arrow-icon"
        class:rotated={showLayersPanel}
      >
        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
      </svg>
    </button>
  </CustomControl>

  <!-- Basemap Panel -->
  {#if showBasemapPanel}
    <CustomControl position="top-left">
      <div class="basemap-panel">
        <h3>Basemap</h3>
        <div class="basemap-options">
          <div 
            class:basemap-option={true} 
            class:selected={currentBasemap === 'gray'}
            on:click={() => selectBasemap('gray')}
          >
            Gray
          </div>
          <div 
            class:basemap-option={true} 
            class:selected={currentBasemap === 'streets'}
            on:click={() => selectBasemap('streets')}
          >
            Streets
          </div>
          <div 
            class:basemap-option={true} 
            class:selected={currentBasemap === 'cycling'}
            on:click={() => selectBasemap('cycling')}
          >
            Cycling
          </div>
        </div>
      </div>
    </CustomControl>
  {/if}

  <!-- Layers Panel -->
  {#if showLayersPanel}
    <CustomControl position="top-right">
      <div class="layers-panel">
        <h3>Map Layers</h3>
        <div class="layer-options">
          <div class="layer-option">
            <label>
              <input 
                type="checkbox" 
                bind:checked={showRouteNetwork}
              />
              Route Network
            </label>
            {#if showRouteNetwork}
              <div class="network-type-selector">
                <label>
                  <input 
                    type="radio" 
                    name="networkType" 
                    value="fast" 
                    bind:group={currentNetworkType}
                  />
                  Fastest
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="networkType" 
                    value="quiet" 
                    bind:group={currentNetworkType}
                  />
                  Quietest
                </label>
              </div>
            {/if}
          </div>
          
          <div class="layer-option">
            <label>
              <input 
                type="checkbox" 
                bind:checked={showCoherentNetwork}
              />
              Coherent Network
            </label>
          </div>
          
          <div class="layer-option">
            <label>
              <input 
                type="checkbox" 
                bind:checked={showCycleNetwork}
              />
              Cycle Network
            </label>
          </div>
          
          <div class="layer-option">
            <label>
              <input 
                type="checkbox" 
                bind:checked={showGapAnalysis}
              />
              Gap Analysis
            </label>
          </div>
          
          <div class="layer-option">
            <label>
              <input 
                type="checkbox" 
                bind:checked={showLocalAuthorities}
              />
              Local Authorities
            </label>
          </div>
        </div>
      </div>
    </CustomControl>
  {/if}

  <!-- Route Network Layer -->
  {#if showRouteNetwork}
    {#key currentNetworkType}
      <VectorTileSource
        id={`route-network-${currentNetworkType}`}
        url={`pmtiles:///route_network_${currentNetworkType}est.pmtiles`}
        attribution="PCTNI"
      >
        <LineLayer
          sourceLayer={`route_network_${currentNetworkType}est_2025-06`}
          paint={{
            'line-color': [
              'interpolate',
              ['linear'],
              ['get', `all_${currentNetworkType}est_bicycle_go_dutch`],
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
            ]
          }}
          minzoom={6}
          maxzoom={18}
        />
      </VectorTileSource>
    {/key}
  {/if}

  <!-- Coherent Network Layer -->
  {#if showCoherentNetwork}
    <VectorTileSource 
      id="coherent-network" 
      url="pmtiles:///corenet_network_ni.pmtiles" 
      attribution="PCTNI"
    >
      <LineLayer
        sourceLayer="corenet_network_ni"
        paint={{
          'line-color': [
            'step',
            ['to-number', ['get', 'all_fastest_bicycle_go_dutch'], 0],
            '#ffbf00',
            1000, '#de3163'
          ],
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 3,
            12, 5,
            16, 8
          ]
        }}
        minzoom={6}
        maxzoom={18}
      />
    </VectorTileSource>
  {/if}

  <!-- Cycle Network Layer -->
  {#if showCycleNetwork}
    <VectorTileSource 
      id="cycle-network" 
      url="pmtiles:///cycle_net_processed.pmtiles" 
      attribution="PCTNI"
    >
      <LineLayer
        sourceLayer="cycle_net_processed"
        paint={{
          'line-color': [
            'match',
            ['get', 'cycle_segregation'],
            'Segregated Track (wide)', '#006400',
            'Off Road Path', '#3cb371',
            'Segregated Track (narrow)', '#90ee90',
            'Shared Footway', '#ffd700',
            'Painted Cycle Lane', '#ff0000',
            '#cccccc'
          ],
          'line-width': [
            'interpolate',
            ['linear'],
            ['zoom'],
            8, 1,
            12, 2,
            16, 4
          ]
        }}
        minzoom={6}
        maxzoom={18}
      />
    </VectorTileSource>
  {/if}

  <!-- Gap Analysis Layer -->
  {#if showGapAnalysis}
    <VectorTileSource 
      id="gap-analysis" 
      url="pmtiles:///gap_map.pmtiles" 
      attribution="PCTNI"
    >
      <LineLayer
        sourceLayer="gap_map"
        paint={{
          'line-color': [
            'match',
            ['get', 'gap_priority'],
            'Critical Gap', '#ff0000',
            'High Priority Gap', '#ff8000',
            'Medium Priority Gap', '#ffff00',
            'No Gap', '#cccccc',
            'rgba(0, 0, 0, 0)'
          ],
          'line-width': [
            'case',
            ['==', ['get', 'gap_priority'], 'No Gap'],
            1,
            3
          ]
        }}
        minzoom={6}
        maxzoom={18}
      />
    </VectorTileSource>
  {/if}

  <!-- Local Authorities Layer -->
  {#if showLocalAuthorities}
    <VectorTileSource 
      id="local-authorities" 
      url="pmtiles:///Local_Authority.pmtiles" 
      attribution="PCTNI"
    >
      <FillLayer
        sourceLayer="Local_Authority"
        paint={{
          'fill-color': [
            'match',
            ['get', 'LGDNAME'],
            'ANTRIM AND NEWTOWNABBEY', '#a6cee3',
            'ARMAGH CITY, BANBRIDGE AND CRAIGAVON', '#1f78b4',
            'BELFAST', '#b2df8a',
            'CAUSEWAY COAST AND GLENS', '#33a02c',
            'DERRY CITY AND STRABANE', '#fb9a99',
            'FERMANAGH AND OMAGH', '#e31a1c',
            'LISBURN AND CASTLEREAGH', '#fdbf6f',
            'MID AND EAST ANTRIM', '#ff7f00',
            'MID ULSTER', '#cab2d6',
            'NEWRY, MOURNE AND DOWN', '#6a3d9a',
            'ARDS AND NORTH DOWN', '#ffff99',
            '#cccccc'
          ],
          'fill-opacity': 0.5,
          'fill-outline-color': 'black'
        }}
        minzoom={6}
        maxzoom={18}
      />
    </VectorTileSource>
  {/if}
</MapLibre>

<style>
  /* Custom Basemap Control Styles */
  .basemap-button-large {
    background-color: #fff;
    border: 0;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 10px 0 0 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 0 2px rgba(0,0,0,.1);
  }

  .basemap-button-large:hover {
    background-color: #f0f0f0;
  }

  /* Layers Button Styles */
  .layers-button {
    background-color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 8px 12px;
    margin: 10px 10px 0 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    box-shadow: 0 0 0 2px rgba(0,0,0,.1);
    font-size: 14px;
    font-weight: 500;
    color: #333;
    min-width: 120px;
  }

  .layers-button:hover {
    background-color: #f0f0f0;
  }

  .arrow-icon {
    transition: transform 0.2s ease;
  }

  .arrow-icon.rotated {
    transform: rotate(180deg);
  }

  .basemap-panel, .layers-panel {
    position: absolute;
    top: 50px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,.15);
    padding: 15px;
    z-index: 100;
    width: 250px;
  }

  .basemap-panel {
    left: 10px;
    width: 200px;
  }

  .layers-panel {
    right: 10px;
  }

  .basemap-panel h3, .layers-panel h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #333;
  }

  .basemap-options, .layer-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .basemap-option, .layer-option {
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
  }

  .basemap-option:hover, .layer-option:hover {
    background-color: #f0f0f0;
  }

  .basemap-option.selected {
    background-color: #007bff;
    color: #fff;
  }

  .layer-option label {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
  }

  .layer-option input[type="checkbox"], 
  .layer-option input[type="radio"] {
    margin-right: 8px;
  }

  .network-type-selector {
    display: flex;
    gap: 10px;
    margin-top: 5px;
    margin-left: 20px;
  }

  .network-type-selector label {
    display: flex;
    align-items: center;
    font-size: 12px;
  }

  .network-type-selector input[type="radio"] {
    margin-right: 4px;
  }
</style>