<script>
  import { dateFormatter } from "../util.mjs";
  export let date;
</script>

<time localtime={date.toISOString()}>{dateFormatter.format(date)}</time>
