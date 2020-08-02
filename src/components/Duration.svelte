<script>
  import { formatDuration, formatDurationISO } from "../util.mjs";
  export let seconds;
</script>

<time localtime={formatDurationISO(seconds)}>{formatDuration(seconds)}</time>
