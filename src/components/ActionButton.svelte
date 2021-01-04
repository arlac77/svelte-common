<script>
  export let action;
  export let shortcuts = "";
</script>

<button
  disabled={$action.disabled}
  aria-keyshortcuts={shortcuts}
  class:active={$action.active}
  on:click|preventDefault={() => action.start()}>
  {#if $action.active}
    <div class="spinner" />
  {/if}
  <slot />
</button>
