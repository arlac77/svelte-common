<script>
  export let action;
  export let error = (e) => console.error(e);
  let active;

  async function click() {
    try {
      active = true;
      await action();
    } catch (e) {
      error(e);
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
