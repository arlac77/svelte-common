<script>
  let component = null;
  let props = null;

  let background, wrap;

  function close() {
    component = null;
  }

  const handleKeyup = event => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  };

  const handleOuterClick = event => {
    if (event.target === background || event.target === wrap) {
      event.preventDefault();
      close();
    }
  };
</script>

<svelte:window on:keyup={handleKeyup} />

<div on:click={handleOuterClick} bind:this={background}>
  <div bind:this={wrap}>
    <svelte:component this={component} {...props} />
  </div>
</div>
<slot />
