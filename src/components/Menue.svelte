<script>
  let open = false;

  function toggleOpen() {
    open = !open;
  }
</script>

<a href="#!" on:click|preventDefault={toggleOpen}>
  <slot name="title" />
  <svg width="14" height="14" viewBox="0 0 24 24" role="img">
    <path d="M6 7l6 6 6-6 2 2-8 8-8-8z" />
  </svg>
  {#if open}
    <slot name="content" />
  {/if}
</a>
