<script>
  let open = $state(false);

  function onclick(event) {
    event.preventDefault();
    open = !open;
  }
</script>

<button {onclick}>
  <slot />
</button>
{#if open}
  <slot name="content" />
{/if}
