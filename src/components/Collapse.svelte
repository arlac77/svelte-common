<script>
  let open = false;

  function toggle() {
    open = !open;
  }
</script>

<button on:click|preventDefault={toggle}>
  <slot />
</button>
{#if open}
  <slot name="content" />
{/if}
