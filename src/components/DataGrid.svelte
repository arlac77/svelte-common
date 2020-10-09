<script>
  export let columns = [{title: "col1" }];
  export let source = { };
</script>

<table>
  <thead>
    {#each columns as column}
      <th>{column.title}</th>
    {/each}
  </thead>
</table>