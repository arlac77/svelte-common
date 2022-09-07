<script>
  import { getContext } from "svelte";

  export let id;

  let header, content;
  const tabs = getContext("TABS");
  tabs.tab[id] = { header, content };
</script>

{#if false}
  <div bind:this={header}>
    <slot name="header" />
  </div>

  <div bind:this={content}>
    <slot />
  </div>
{/if}
