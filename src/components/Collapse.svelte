<script>
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   * @property {import('svelte').Snippet} [content]
   */

  /** @type {Props} */
  let { children, content } = $props();
  let open = $state(false);

  function onclick(event) {
    event.preventDefault();
    open = !open;
  }
</script>

<button {onclick}>
  {@render children?.()}
</button>
{#if open}
  {@render content?.()}
{/if}
