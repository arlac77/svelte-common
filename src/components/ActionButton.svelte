<script>
  export let action;

  let active;

  async function myAction() {
    try {
      active = true;
      return action();
    } finally {
      active = false;
    }
  }
</script>

<button on:click={myAction}>
  {#if active}
    <div class="spinner" />
  {/if}
  <slot />
</button>
