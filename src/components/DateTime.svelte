<script>
  import { dateFormatter } from "../util.mjs";
  export let date;
</script>

<time datetime={date.toISOString()}>{dateFormatter.format(date)}</time>
