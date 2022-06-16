<script>
  import { setContext } from "svelte";

  export let columns = [];
  const dataGrid = {
    columns,
    addColumn: c => {
      console.log("addColumn", c);
      columns.push(c);
    }
  };

  setContext("DATA_GRID", dataGrid);

  export let source = { entries: [] };
</script>

<table>
  <thead>
    {#each columns as column}
      <svelte:component this={column.component} />
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
