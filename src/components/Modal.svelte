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

<div
  role="none"
  on:click={handleOuterClick}
  on:keyup={handleKeyup}
  bind:this={background}
>
  <div class="center modal">
    <div class="window">
      <slot />
    </div>
  </div>
</div>
