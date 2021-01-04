<script>
  import * as style from "./main.css";

  import {
    DataGrid,
    Bytes,
    DateTime,
    Duration,
    TopNav,
    Collapse,
    ActionButton,
    Action,
    Menue,
    Modal,
    About,
    ApplicationDetails,
    SessionDetails,
    ServerDetails,
    PeerDetails,
    ServiceWorkerDetails,
    ServiceWorkerRegistrationDetails
  } from "../../../src/index.svelte";
  import { fade } from "svelte/transition";
  import { readable } from "svelte/store";

  const columns = [{ id: "col1" }, { id: "col2", title: "Title for col2" }];
  const source = {
    entries: [
      { col1: "a1", col2: "b1" },
      { col1: "a2", col2: "b2" }
    ]
  };

  let actionExecuted = 0;

  const action2 = new Action(
    () => {
    return new Promise(resolve => setTimeout(resolve, 5000));
  }
  );

  const action = new Action(
    () => {
    action2.disabled = !action2.disabled;
    actionExecuted += 1;
    return new Promise(resolve => setTimeout(resolve, 5000));
  }
  );


  const failingAction = new Action(() => new Promise((resolve, reject) =>
      setTimeout(() => reject("failed"), 5000))
  );

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

  const to = { host: "1.2.3.4", port: 1234 };
  const referrer = { host: "1.2.3.4", port: 1235 };
  const peers = [
    { host: "somewhere", port: 33 },
    { host: "somewhere2", port: 33, to },
    {
      host: "somewhere3",
      port: 33,
      to,
      referrer
    }
  ];

  const serviceWorker = readable(
    { state: "up", scriptURL: "somewhere.mjs" },
    set => {
      return () => {};
    }
  );
  const serviceWorkerRegistration = readable(
    { scope: "http://localhost:5000/components/svelte-common/tests/app/" },
    set => {
      return () => {};
    }
  );

  /*
  const {serviceWorker, serviceWorkerRegistration } = initializeServiceWorker("service-worker.mjs");
  */
</script>

<TopNav offset={42}>
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
  <ul>
    <li><a href="/">Entry</a></li>
  </ul>
</TopNav>
<main>
  <ActionButton {action} shortcuts="enter">Long Running Action</ActionButton>
  <ActionButton action={action2}>Sometimes Disabled</ActionButton>
  <ActionButton action={failingAction} error={e => alert(e)}>
    Failing Action
  </ActionButton>
  <div id="actionExecuted">{actionExecuted}</div>

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
  <Bytes value="10" />
  <Bytes value="100" />
  <Bytes value="1000" />
  <Bytes value="10000" />
  <Bytes value="100000" />
  <Bytes value="1000000" />
  <Bytes value="10000000" />

  <DataGrid {columns} {source} />

  {#if modal}
    <Modal {close}>
      <form>
        <fieldset>
          <label for="username">
            Username 1
            <input
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              required
              value="XXX"
              size="10" />
          </label>
          <label for="password">
            Password 1
            <input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              size="10"
              required />
          </label>
        </fieldset>

        <button id="submit" type="submit">Login</button>
      </form>
    </Modal>
  {/if}

  {#if about}
    <About>
      <ApplicationDetails
        version="1.0"
        name="my title"
        description="a description" />
      <tr>
        <td />
        <td>a new entry</td>
        <td>a value</td>
      </tr>
      <SessionDetails {session} />
      <ServerDetails {server} />
      <ServiceWorkerDetails serviceWorker={$serviceWorker} />
      <ServiceWorkerRegistrationDetails
        serviceWorkerRegistration={$serviceWorkerRegistration} />
      <PeerDetails {peers} />
    </About>
  {/if}
</main>
