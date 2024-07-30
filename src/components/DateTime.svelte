<script>
  import { dateFormatter } from "../util.mjs";
  let { date } = $props();
</script>

{#if date}
  <time datetime={date.toISOString()}>{dateFormatter.format(date)}</time>
{/if}
