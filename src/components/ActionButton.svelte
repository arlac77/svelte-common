<script>
  export let action;
  export let shortcuts = "";
  export let disabled;

  let active;

  $: active = $action.active;
</script>

<button
  {disabled}
  aria-keyshortcuts={shortcuts}
  class:active
  on:click|preventDefault={() => action.start()}>
  {#if active}
    <div class="spinner" />
  {/if}
  <slot />
</button>
