<script>
  import { getContext } from "svelte";

  export let id;

  let header, content;
  const tabs = getContext("TABS");
  tabs.tab[id] = { header, content };
</script>

  <div bind:this={header}>
    <slot name="header" />
  </div>
  {#if tabs.current === id}
  <div bind:this={content}>
    <slot />
  </div>
{/if}
