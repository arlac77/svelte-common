<script>
  import Duration from "./Duration.svelte";
  import { formatBytes } from "../util.mjs";

  export let server;
</script>

<tr>
  <td colspan="3">Server</td>
</tr>
<tr>
  <td />
  <td>Version</td>
  <td>{server.version}</td>
</tr>
<tr>
  <td />
  <td>Uptime</td>
  <td>
    {#if server.uptime >= 0}
      <Duration seconds={server.uptime} />
    {:else}<div class="error">down</div>{/if}
  </td>
</tr>
<tr>
  <td />
  <td>Heap Total</td>
  <td>{formatBytes(server.memory.heapTotal)}</td>
</tr>
<tr>
  <td />
  <td>Heap Used</td>
  <td>{formatBytes(server.memory.heapUsed)}</td>
</tr>
<tr>
  <td />
  <td>External</td>
  <td>{formatBytes(server.memory.external)}</td>
</tr>
<tr>
  <td />
  <td>RSS</td>
  <td>{formatBytes(server.memory.rss)}</td>
</tr>
