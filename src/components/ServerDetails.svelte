<script>
  import Duration from "./Duration.svelte";
  import Bytes from "./Bytes.svelte";

  export let server;

  if (!server) {
    server = {};
  }
  const memory = server.memory || {
    heapTotal: 0,
    heapUsed: 0,
    external: 0,
    rss: 0,
    arrayBuffers: 0
  };

  const memSlots = [
    { key: "external", title: "External" },
    { key: "heapTotal", title: "Heap Total" },
    { key: "heapUsed", title: "Heap Used" },
    { key: "arrayBuffers", title: "Array Buffers" },
    { key: "rss", title: "RSS" }
  ];
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

{#each memSlots as { key, title }}
  <tr>
    <td />
    <td>{title}</td>
    <td><Bytes value={memory[key]} /></td>
  </tr>
{/each}
