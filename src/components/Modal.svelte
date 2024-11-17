<script>
  let { close, children } = $props();

  let background;

  const onkeyup = event => {
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

<svelte:window {onkeyup} />

<div
  role="none"
  click={handleOuterClick}
  keyup={handleKeyup}
  bind:this={background}
>
  <div class="center modal">
    <div class="window">
      {@render children?.()}
    </div>
  </div>
</div>
