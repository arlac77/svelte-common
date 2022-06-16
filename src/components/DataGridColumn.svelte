<script>
  import { setContext, getContext } from "svelte";

  const dataGrid = getContext("DATA_GRID");

  dataGrid.addColumn({ id, component: this});
  export let id;
</script>

<th {id}>
  <slot />
</th>
