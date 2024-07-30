<script>
  import Duration from "./Duration.svelte";
  import Bytes from "./Bytes.svelte";

  let { server } = $props();

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
  <td></td>
  <td>Version</td>
  <td>{#if server?.version}{server.version}{:else}<div class="error">down</div>{/if}</td>
</tr>
<tr>
  <td></td>
  <td>Uptime</td>
  <td>
    {#if server?.uptime >= 0}
      <Duration seconds={server.uptime} />
    {:else}<div class="error">down</div>{/if}
  </td>
</tr>
{#each memSlots as { key, title }}
  <tr>
    <td></td>
    <td>{title}</td>
    <td>{#if server?.memory}<Bytes value={server.memory[key]}/>{:else}<div class="error">down</div>{/if}</td>
  </tr>
{/each}
