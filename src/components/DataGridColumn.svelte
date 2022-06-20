<script>
  import { getContext } from "svelte";

  export let id;

  const dataGrid = getContext("DATA_GRID");

  let component;

  dataGrid.addColumn({ id, component });
</script>

<th {id} bind:this={component}>
  <slot>
    {id}
  </slot>
</th>
