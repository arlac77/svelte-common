<script>
  import Duration from "./Duration.svelte";
  import Bytes from "./Bytes.svelte";

  export let server;

  const memory = { ...server.memory };
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
  <td><Bytes value={memory.heapTotal}/></td>
</tr>
<tr>
  <td />
  <td>Heap Used</td>
  <td><Bytes value={memory.heapUsed}/></td>
</tr>
<tr>
  <td />
  <td>External</td>
  <td><Bytes value={memory.external}/></td>
</tr>
<tr>
  <td />
  <td>RSS</td>
  <td><Bytes value={memory.rss}/></td>
</tr>
