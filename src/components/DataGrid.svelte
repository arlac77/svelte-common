<script>
  import { setContext } from "svelte";
  import { DataGrid, DATA_GRID} from "../data-grid.mjs";

  export let source = { entries: [] };

  const dataGrid = new DataGrid();
  setContext(DATA_GRID, dataGrid);
</script>

<table>
  <!--<slot/>-->
  <thead>
    {#each dataGrid.columns as column}
     {column.id} {column.headerComponent}
      <svelte:component this={column.headerComponent} />
    {/each}
  </thead>
  <tbody>
    {#each source.entries as entry}
      <tr>
        {#each dataGrid.columns as column}
          <td>{entry[column.id]}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
