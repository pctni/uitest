<script lang="ts">
  // Define volume ranges and colors
  const volumeRanges = [
    { min: 3000, max: null, color: '#ff00ff', label: '3000+ trips/day' },
    { min: 2000, max: 2999, color: '#0000ff', label: '2000-2999 trips/day' },
    { min: 1000, max: 1999, color: '#0080ff', label: '1000-1999 trips/day' },
    { min: 500, max: 999, color: '#80c0ff', label: '500-999 trips/day' },
    { min: 250, max: 499, color: '#00ffff', label: '250-499 trips/day' },
    { min: 100, max: 249, color: '#80ff00', label: '100-249 trips/day' },
    { min: 50, max: 99, color: '#ffff00', label: '50-99 trips/day' },
    { min: 0, max: 49, color: '#808080', label: '<50 trips/day' }
  ];
</script>

<div class="legend">
  <h4>Cycling Volume</h4>
  {#each volumeRanges as range}
    <div class="legend-item">
      <div class="legend-color" style="background-color: {range.color}"></div>
      <span>{range.label}</span>
    </div>
  {/each}
</div>

<style>
  .legend {
    position: absolute;
    bottom: 30px;
    left: 10px;
    background: white;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 12px;
    z-index: 1000;
    max-width: 200px;
  }

  .legend h4 {
    margin: 0 0 10px 0;
    font-size: 14px;
    font-weight: bold;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .legend-color {
    width: 20px;
    height: 3px;
    margin-right: 8px;
    border-radius: 1px;
  }
</style>