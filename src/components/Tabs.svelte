<script>
  import { setContext } from "svelte";

  const tabs = { tab: {} };

  setContext("TABS", tabs);
</script>

<slot />

{#each Object.entries(tabs.tab) as t}
  {t[0]}
  <svelte:component this={t[1].header} />
{/each}
