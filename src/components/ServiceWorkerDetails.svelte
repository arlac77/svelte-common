<script>
  let { serviceWorker } = $props();
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
