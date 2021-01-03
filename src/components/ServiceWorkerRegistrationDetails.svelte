<script>
  import { Action } from "../action.mjs";
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
    <ActionButton
      shortcuts="Command+u"
      action={new Action(() => serviceWorkerRegistration.update())}>
      Update
    </ActionButton>
    <ActionButton
      action={new Action(() => serviceWorkerRegistration.unregister())}>
      Unregister
    </ActionButton>
  </td>
</tr>
