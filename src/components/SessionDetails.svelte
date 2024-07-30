<script>
  import { EntitlementBadges, Entitlement } from "svelte-entitlement";
  import DateTime from "./DateTime.svelte";
  let { session } = $props();
</script>

<tr>
  <td colspan="3">Session</td>
</tr>
<tr>
  <td></td>
  <td>Username</td>
  <td>{session.username || ""}</td>
</tr>
<tr>
  <td></td>
  <td>Expiration</td>
  <td class={session.isValid ? "ok" : "error"}>
    <DateTime date={session.expirationDate} />
  </td>
</tr>
<tr>
  <td></td>
  <td>Entitlements</td>
  <td>
    <EntitlementBadges
      entitlements={[...session.entitlements]
        .sort()
        .map(name => new Entitlement(name))}
    />
  </td>
</tr>
