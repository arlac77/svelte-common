<script>
  let { close } = $props();

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

<svelte:window keyup={handleKeyup} />

<div
  role="none"
  click={handleOuterClick}
  keyup={handleKeyup}
  bind:this={background}
>
  <div class="center modal">
    <div class="window">
      <slot />
    </div>
  </div>
</div>
