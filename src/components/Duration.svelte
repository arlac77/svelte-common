<script>
  import { formatDuration, formatDurationISO } from "../util.mjs";
  export let seconds;
</script>

<time datetime={formatDurationISO(seconds)}>{formatDuration(seconds)}</time>
