<script>
  export let close;

  let background;

  const handleKeyup = event => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  };

  const handleOuterClick = event => {
    if (event.target === background) {
      event.preventDefault();
      close();
    }
  };
</script>

<svelte:window on:keyup={handleKeyup} />

<div on:click={handleOuterClick} bind:this={background}>
  <div class="center modal">
    <slot />
  </div>
</div>
