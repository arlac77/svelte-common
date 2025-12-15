<script>
  import { formatBytes } from "pacc";
  let { value } = $props();
</script>

<span>{formatBytes(value)}</span>
