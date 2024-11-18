<script>
  import { Tabs, Tab } from "../../../src/index.svelte";
</script>

<TabsTest>
  {#snippet header(title)}
    <button>{title}</button>
  {/snippet}

  <Tabs>
    <Tab header={header("Tab 1")} id="t1">content tab 1</Tab>
  </Tabs>
</TabsTest>
