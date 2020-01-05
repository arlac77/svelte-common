<script>
  import { DateTime, Duration, Collapse, ActionButton, Menue } from "../../src/index.svelte";
	import { fade } from 'svelte/transition';

  let actionExecuted = false;

  async function action() {
    actionExecuted = true;
    return new Promise(resolve => setTimeout(resolve, 5000));
  }

  async function failingAction() {
    return new Promise((resolve, reject) =>
      setTimeout(() => reject("failed"), 5000)
    );
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
      <a href="/">Entry</a>
    </li>
  </ul>
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

  <ActionButton action={failingAction}>Failing Action</ActionButton>

  <Collapse>
    Collapse
    <ul id="collapse-content" slot="content" in:fade out:fade>
      <li>1st.</li>
      <li>2nd.</li>
    </ul>
  </Collapse>

  <div>
    Days <Duration seconds=1000000/>
    Hours <Duration seconds=5000/>

    <DateTime date={new Date()}/>
  </div>
</main>
