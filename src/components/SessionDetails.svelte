<script>
  import Entitlement from "./Entitlement.svelte";
  import DateTime from "./DateTime.svelte";
  export let session;
</script>

<tr>
  <td>Username</td>
  <td>{session.username}</td>
</tr>
<tr>
  <td>Session Expiration</td>
  <td class={session.isValid ? 'ok' : 'error'}>
    <DateTime date={session.expirationDate} />
  </td>
</tr>
<tr>
  <td>Entitlements</td>
  <td>
    {#each [...session.entitlements].sort() as name}
      <Entitlement id={name} />
    {/each}
  </td>
</tr>
