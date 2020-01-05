<script>
  import { dateFormatter } from "../index.mjs";
  export let date;
</script>

<time localtime={date.toISOString()}>{dateFormatter.format(date)}</time>
