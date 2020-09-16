<script>
  import Duration from "./Duration.svelte";
  import { formatBytes } from "../util.mjs";

  export let server;
</script>

<tr>
  <td>Server Version</td>
  <td>{server.version}</td>
</tr>
<tr>
  <td>Server Uptime</td>
  <td>
    <Duration seconds={server.uptime} />
  </td>
</tr>
<tr>
  <td>Server Heap Total</td>
  <td>{formatBytes(server.memory.heapTotal)}</td>
</tr>
<tr>
  <td>Server Heap Used</td>
  <td>{formatBytes(server.memory.heapUsed)}</td>
</tr>
