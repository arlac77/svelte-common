<script>
  import TCPSocket from "./TCPSocket.svelte";
  let { peer } = $props();
</script>

<div class="peer">
  <TCPSocket socket={peer} />
  {#if peer.referrer}
    (referrer
    <TCPSocket socket={peer.referrer} />)
  {/if}
  {#if peer.to}
    (to
    <TCPSocket socket={peer.to} />)
  {/if}
</div>
