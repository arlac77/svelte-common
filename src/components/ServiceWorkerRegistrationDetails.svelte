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
      action={new Action(() => serviceWorkerRegistration.update(), {
        title: 'Update',
        shortcuts: 'Command+u'
      })} />
    <ActionButton
      action={new Action(() => serviceWorkerRegistration.unregister(), {
        title: 'Unregister'
      })} />
  </td>
</tr>
