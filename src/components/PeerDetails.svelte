<script>
  import Peer from "./Peer.svelte";

  export let peers;
</script>

<tr>
  <td>Peers</td>
  <td colspan="2">
    {#each peers as peer}
      <Peer {peer} />
    {/each}
  </td>
</tr>
