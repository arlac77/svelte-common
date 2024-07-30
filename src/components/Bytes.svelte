<script>
  import { formatBytes } from "../util.mjs";
  let { value } = $props();
</script>

<span>{formatBytes(value)}</span>
