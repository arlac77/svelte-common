<script>
  import { formatDurationISO } from "../util.mjs";
  import { formatDuration } from "pacc";
  let { seconds } = $props();
</script>

<time datetime={formatDurationISO(seconds)}>{formatDuration(seconds)}</time>
