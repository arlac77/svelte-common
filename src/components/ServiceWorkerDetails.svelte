<script>
  export let serviceWorker;
  export let serviceWorkerRegistration;
</script>

<tr>
  <td colspan="3">Service Worker</td>
</tr>
<tr>
  <td></td>
  <td>State</td>
  <td>{serviceWorker.state}</td>
</tr>
<tr>
  <td></td>
  <td>scriptURL</td>
  <td>{serviceWorker.scriptURL}</td>
</tr>
<tr>
  <td></td>
  <td>Scope</td>
  <td>{serviceWorkerRegistration.scope}</td>
</tr>
