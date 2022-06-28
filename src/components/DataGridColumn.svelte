<script>
  import { getContext } from "svelte";
  import { DATA_GRID} from "../data-grid.mjs";

  export let id;

  const dataGrid = getContext(DATA_GRID);

  let headerComponent;

  dataGrid.addColumn({ id, headerComponent });
</script>

<th {id} bind:this={headerComponent}>
  <slot name="header">
    {id}
  </slot>
</th>
