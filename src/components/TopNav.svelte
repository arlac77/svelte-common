<script>
  /** @type {{offset?: number, tolerance?: number, children?: import('svelte').Snippet}} */
  let { offset = 0, tolerance = 0, children } = $props();

  let lastY = 0;

  let y = $state(0);
  let headerClass = $derived.by(() => {
    const dy = lastY - y;
    lastY = y;

    if (y < offset) {
      return "show";
    }

    if (Math.abs(dy) <= tolerance) {
      return headerClass || "show";
    }

    return dy < 0 ? "show" : "hide";
  });
</script>

<svelte:window bind:scrollY={y} />

<nav class={headerClass}>
  {@render children?.()}
</nav>
