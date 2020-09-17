<script>
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
  {peer.host}:{peer.port}
  {#if peer.referrer}(referrer {peer.referrer.host}:{peer.referrer.port}){/if}
  {#if peer.to}(to {peer.to.host}:{peer.to.port}){/if}
</div>
