<script>
  import { formatDuration, formatDurationISO } from "pacc";
  let { seconds } = $props();
</script>

<time datetime={formatDurationISO(seconds)}>{formatDuration(seconds)}</time>
