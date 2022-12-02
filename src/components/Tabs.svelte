<script>
  import { setContext } from "svelte";

  const tabs = { current: "t5", tab: {} };

  setContext("TABS", tabs);
</script>

<slot />

<!---
{#each Object.entries(tabs.tab) as tab}
  {JSON.stringify(tab)}
  <svelte:component this={tab[1].header} />
{/each}
-->