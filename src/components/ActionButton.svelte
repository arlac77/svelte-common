<script>
  export let action;
</script>

<button
  disabled={$action.disabled}
  aria-keyshortcuts={$action.shortcuts}
  class:active={$action.active}
  on:click|preventDefault={() => action.start()}>
  {#if $action.title !== undefined}
    {$action.title}
  {/if}
  {#if $action.active}
    <div class="spinner" />
  {/if}
  <slot />
</button>
