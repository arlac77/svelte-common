<script>
  import { getContext } from "svelte";

  export let id;

  const tabs = getContext("TABS");
</script>

<slot />
