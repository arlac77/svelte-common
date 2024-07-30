<script>
  import { formatDuration, formatDurationISO } from "../util.mjs";
  let { seconds } = $props();
</script>

<time datetime={formatDurationISO(seconds)}>{formatDuration(seconds)}</time>
