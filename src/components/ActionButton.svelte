<script>
  export let action;

  let active;

  async function click() {
    try {
      active = true;
      await action();
    } catch (e) {
      console.log(e);
    } finally {
      active = false;
    }
  }
</script>

<button class:active on:click={click}>
  {#if active}
    <div class="spinner" />
  {/if}
  <slot />
</button>
