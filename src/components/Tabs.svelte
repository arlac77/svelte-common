<script>
  import { setContext } from "svelte";

  const tabs = {};

  setContext("TABS", tabs);
</script>

<slot />
