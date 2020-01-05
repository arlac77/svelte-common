<script>
  import { formatDuration, formatDurationISO } from "../index.mjs";
  export let seconds;
</script>

<time localtime={formatDurationISO(seconds)}>{formatDuration(seconds)}</time>
