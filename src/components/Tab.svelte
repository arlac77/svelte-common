<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script>
  import { getContext } from "svelte";

  let { id, header, children } = $props();

  let content = $state();
  const tabs = getContext("TABS");
  tabs.tab[id] = { header, content };
</script>

  <div bind:this={header}>
    {@render header?.()}
  </div>
  {#if tabs.current === id}
  <div bind:this={content}>
    {@render children?.()}
  </div>
{/if}
