<script>
  export let action;
</script>

<button
  disabled={$action.disabled}
  aria-keyshortcuts={$action.shortcuts}
  class:active={$action.active}
  class:failed={$action.failed}
  on:click|preventDefault={() => action.start()}>
  {#if $action.title !== undefined}{$action.title}{/if}
  <slot />
  {#if $action.active}
    <div class="spinner" />
  {/if}
</button>
