<script>
  import TCPSocket from "./TCPSocket.svelte";
  export let peer;
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
