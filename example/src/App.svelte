<script>
  import {
    DateTime,
    Duration,
    Collapse,
    ActionButton,
    Menue,
    Modal,
    About,
    SessionDetails,
    ServerDetails
  } from "../../src/index.svelte";
  import { fade } from "svelte/transition";

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

  let modal = true;
  let about = true;

  let close = () => {
    modal = false;
  };

  const session = {
    isValid: true,
    username: "huho",
    entitlements: ["a", "b", "c"],
    expirationDate: new Date()
  };

  const start = Date.now();

  const server = {
    version: "1.2.3",
    memory: { heapTotal: 1200000, heapUsed: 1000000, rss: 0, external: 0 }
  };

  setInterval(() => (server.uptime = (Date.now() - start) / 1000), 5000);
</script>

<nav>
  <a href="/">Example</a>
  <ul>
    <li><a href="/">Entry</a></li>
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
    Days
    <Duration seconds="1000000" />
    Hours
    <Duration seconds="5000" />

    <DateTime date={new Date()} />
  </div>

  {#if modal}
    <Modal {close}>
      <form>
        <fieldset>
          <label for="username">
            Username 1 <input id="username" type="text" placeholder="Username" name="username" required value="XXX" size="10" />
          </label>
          <label for="password">
            Password 1 <input id="password" type="password" placeholder="Password" name="password" size="10" required />
          </label>
        </fieldset>

        <button id="submit" type="submit">Login</button>
      </form>
    </Modal>
  {/if}

  {#if about}
    <About version="1.0" name="my title" description="a description">
      <tr>
        <td />
        <td>a new entry</td>
        <td>a value</td>
      </tr>
      <SessionDetails {session} />
      <ServerDetails {server} />
    </About>
  {/if}
</main>
