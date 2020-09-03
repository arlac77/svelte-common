<script>
  export let name;
  export let version;
  export let description;    
</script>

<h2>{name}</h2>
<p>{description}</p>
<table class="bordered striped hoverable">
  <tbody>
    <tr>
      <td>Version</td>
      <td>{version}</td>
    </tr>
    <slot/>
  </tbody>
</table>
