<script>
  import { ActionButton, Menue } from "../../src/index.svelte";

  let actionExecuted = false;

  async function action() {
    actionExecuted = true;
    return new Promise(resolve => setTimeout(resolve, 5000));
  }

  async function login() {}
  async function logout() {
    alert("logout");
  }
</script>

<nav>
  <a href="/">Example</a>
  <ul>
    <li>
      <Menue>
        <div slot="title" class="dropdown-trigger">User</div>
        <div slot="content" class="dropdown-menu dropdown-menu-sw">
          <a href="#!" class="dropdown-item" on:click|preventDefault={logout}>
            Logout
          </a>
          <div role="none" class="dropdown-divider" />
          <a href="#!" class="dropdown-item">Profile</a>
          <a href="#!" class="dropdown-item">About</a>
          <a href="#!" class="dropdown-item">Setting 1</a>
        </div>
      </Menue>
    </li>
  </ul>
</nav>
<main>
  <ActionButton {action}>Long Running Action</ActionButton>

  <div id="actionExecuted">{actionExecuted}</div>
</main>
