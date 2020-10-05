<script>
  export let offset = 0;
  export let tolerance = 0;

  let headerClass = "show";
  let y = 0;
  let lastY = 0;

  function deriveClass(y, dy) {
    if (y < offset) {
      return "show";
    }

    if (Math.abs(dy) <= tolerance) {
      return headerClass;
    }

    return dy < 0 ? "show" : "hide";
  }

  function updateClass(y) {
    const dy = lastY - y;
    lastY = y;
    return deriveClass(y, dy);
  }

  $: headerClass = updateClass(y);
</script>

<svelte:window bind:scrollY={y} />

<nav class={headerClass}>
  <slot />
</nav>
