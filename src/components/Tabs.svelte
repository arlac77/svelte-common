<script>
  import { setContext } from "svelte";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();

  const tabs = { current: "t5", tab: {} };

  setContext("TABS", tabs);
</script>

{@render children?.()}

<!---
{#each Object.entries(tabs.tab) as tab}
  {JSON.stringify(tab)}
  <svelte:component this={tab[1].header} />
{/each}
-->