<script>
  import TCPSocket from "./TCPSocket.svelte";
  export let peer;
</script>

<style>
  .peer {
    display: inline-block;
    background-color: var(--button-disabled-background-color);
    border-radius: 0.5em;
    padding: 0.2em;
    margin: 0.2em;
  }
</style>

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
