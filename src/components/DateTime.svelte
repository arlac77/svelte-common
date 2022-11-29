<script>
  import { dateFormatter } from "../util.mjs";
  export let date;
</script>

{#if date}
<time datetime={date.toISOString()}>{dateFormatter.format(date)}</time>
{/if}