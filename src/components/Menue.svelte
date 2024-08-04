<script>
  import AnchorContentCatcher from "./AnchorContentCatcher.svelte";

  let open = $state(false);

  function close() {
    open = false;
  }

  function show(event) {
    event.preventDefault();
    open = true;
  }
</script>

{#if open}
  <AnchorContentCatcher {close}>
    <a href=" " slot="anchor">
      <slot name="title" />
    </a>
    <div slot="content">
      <slot name="content" />
    </div>
  </AnchorContentCatcher>
{:else}
  <a href=" " onclick={show} onmouseenter={show}>
    <slot name="title" />
    <svg width="18" height="16">
      <path d="M6 7l6 6 6-6 2 2-8 8-8-8z" />
    </svg>
  </a>
{/if}
