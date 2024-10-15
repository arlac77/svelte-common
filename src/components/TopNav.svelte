<script>
  /** @type {{offset?: number, tolerance?: number, children?: import('svelte').Snippet}} */
  let { offset = 0, tolerance = 0 } = $props();

  let headerClass = $state("show");
  let y = $state(0);
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

  headerClass = updateClass(y);
</script>

<svelte:window bind:scrollY={y} />

<nav class={headerClass}>
  <slot />
</nav>
