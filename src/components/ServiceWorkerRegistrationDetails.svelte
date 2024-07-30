<script>
  import { Command, CommandButton } from "svelte-command";
  let { serviceWorkerRegistration } = $props();
</script>

<tr>
  <td></td>
  <td>Scope</td>
  <td id="serviceWorkerScope">{serviceWorkerRegistration.scope}</td>
</tr>
<tr>
  <td></td>
  <td colspan="2">
    <CommandButton
      command={new Command(() => serviceWorkerRegistration.update(), {
        title: "Update",
        shortcuts: "Command+u"
      })}
    />
    <CommandButton
      command={new Command(() => serviceWorkerRegistration.unregister(), {
        title: "Unregister"
      })}
    />
  </td>
</tr>
