<script>
  let { name, version, description } = $props();
</script>

<tr>
  <td colspan="3">{name}</td>
</tr>
<tr>
  <td colspan="3">{description}</td>
</tr>
<tr>
  <td></td>
  <td>Version</td>
  <td>{version}</td>
</tr>
