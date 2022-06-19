<script>
  import { getContext } from "svelte";

  const dataGrid = getContext("DATA_GRID");

  let component;

  dataGrid.addColumn({ id, component });
  export let id;
</script>

<th {id} bind:this={component}>
  <slot>
    {id}
  </slot>
</th>
