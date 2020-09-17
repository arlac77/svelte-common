<script>
  export let name;
  export let version;
  export let description;
</script>

<table class="bordered striped hoverable">
  <tbody>
    <tr>
      <td colspan="3">{name}</td>
    </tr>
    <tr>
      <td></td>
      <td>Version</td>
      <td>{version}</td>
    </tr>
    <tr>
      <td></td>
      <td colspan="2">{description}</td>
    </tr>
    <slot />
  </tbody>
</table>
