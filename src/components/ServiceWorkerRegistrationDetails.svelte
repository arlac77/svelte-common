<script>
  import ActionButton from "./ActionButton.svelte";
  export let serviceWorkerRegistration;
</script>

<tr>
  <td />
  <td>Scope</td>
  <td id="serviceWorkerScope">{serviceWorkerRegistration.scope}</td>
</tr>
<tr>
  <td />
  <td colspan="2">
    <ActionButton action={() => serviceWorkerRegistration.update()}>
      Update
    </ActionButton>
    <ActionButton action={() => serviceWorkerRegistration.unregister()}>
      Unregister
    </ActionButton>
  </td>
</tr>
