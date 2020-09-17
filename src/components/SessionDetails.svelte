<script>
  import Entitlement from "./Entitlement.svelte";
  import DateTime from "./DateTime.svelte";
  export let session;
</script>

<tr>
  <td colspan="3">Session</td>
</tr>
<tr>
  <td />
  <td>Username</td>
  <td>{session.username}</td>
</tr>
<tr>
  <td />
  <td>Expiration</td>
  <td class={session.isValid ? 'ok' : 'error'}>
    <DateTime date={session.expirationDate} />
  </td>
</tr>
<tr>
  <td />
  <td>Entitlements</td>
  <td>
    {#each [...session.entitlements].sort() as name}
      <Entitlement id={name} />
    {/each}
  </td>
</tr>
