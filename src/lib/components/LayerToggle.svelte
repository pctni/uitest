<script lang="ts">
  export let visible = true;
  export let onToggle: () => void;
</script>

<div class="layer-control">
  <label>
    <input type="checkbox" bind:checked={visible} on:change={onToggle}>
    Route Network Layer
  </label>
</div>

<style>
  .layer-control {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    z-index: 1000;
  }

  .layer-control label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .layer-control input[type="checkbox"] {
    margin-right: 8px;
  }
</style>