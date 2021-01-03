<script>
  export let action;
  export let error = (e) => console.error(e);
  export let shortcuts=""
  export let disabled;

  let active;

  async function click() {
    if(active) {
      return;
    }

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

<button {disabled} aria-keyshortcuts={shortcuts} class:active on:click|preventDefault={click}>
  {#if active}
    <div class="spinner" />
  {/if}
  <slot />
</button>
