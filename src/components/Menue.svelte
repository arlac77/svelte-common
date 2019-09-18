<script>
  let open = false;

  function hide() {
 //   open = false;
  }

  function show() {
    open = true;
  }
</script>

<a
  href="/#"
  on:click|preventDefault={show}
  on:mouseenter={show}
  on:mouseleave={hide}>
  <slot name="title" />
  <svg width="14" height="14" viewBox="0 0 24 24" role="img">
    <path d="M6 7l6 6 6-6 2 2-8 8-8-8z" />
  </svg>
  {#if open}
    <slot name="content" />
  {/if}
</a>
