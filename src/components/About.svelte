<script>
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<table class="bordered striped">
  <tbody>
    {@render children?.()}
  </tbody>
</table>
