<script>
  import { ActionButton, Menue } from "../../src/index.svelte";

  let actionExecuted = false;

  async function action() {
    actionExecuted = true;
    return new Promise(resolve => setTimeout(resolve, 5000));
  }

  async function login() {}
  async function logout() { alert('logout'); }
</script>

<nav>
  <a href="/">Example</a>
  <ul>
    <li>
      <Menue>
        <div slot="title" class="dropdown-trigger">User</div>
        <ul slot="content" class="dropdown-content">
          <li>
            <a href="#!" on:click|preventDefault={logout}>Logout</a>
          </li>
          <li>
            <a href="#!">Profile</a>
          </li>
          <li>
            <a href="#!">About</a>
          </li>
          <li>
            <a href="#!">Setting 1</a>
          </li>
        </ul>
      </Menue>
    </li>
  </ul>
</nav>
<main>
  <ActionButton {action}>Long Running Action</ActionButton>

  <div id="actionExecuted">{actionExecuted}</div>
</main>
