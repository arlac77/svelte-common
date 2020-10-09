<script>
  import AnchorContentCatcher from "./AnchorContentCatcher.svelte";

  let open = false;

  function hide() {
    open = false;
  }

  function show() {
    open = true;
  }
</script>
<style>
  .x {
    position: absolute;
    top: 100px;
  }
</style>
{#if open}
  <AnchorContentCatcher close={hide}>
    <a href=" " slot="anchor">
      <slot name="title" />
    </a>
    <div class="x" slot="content">
      <slot name="content" />
    </div>
  </AnchorContentCatcher>
{:else}
  <a href=" " on:click|preventDefault={show} on:mouseenter={show}>
    <slot name="title" />
    <svg width="18" height="16">
      <path d="M6 7l6 6 6-6 2 2-8 8-8-8z" />
    </svg>
  </a>
{/if}
