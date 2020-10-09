<script>
  export let columns = [];
  export let source = { entries: [] };
</script>

<table>
  <thead>
    {#each columns as column}
      <th>{column.title||column.id}</th>
    {/each}
  </thead>
  <tbody>
    {#each source.entries as entry}
      <tr>
        {#each columns as column}
          <td>{entry[column.id]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
