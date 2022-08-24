<script>
  import { fade } from "svelte/transition";
  import { readable, writable } from "svelte/store";

  import {
    DataGrid,
    DataGridColumn,
    Bytes,
    DateTime,
    Duration,
    TopNav,
    Collapse,
    Menue,
    Modal,
    About,
    ApplicationDetails,
    SessionDetails,
    ServerDetails,
    PeerDetails,
    ServiceWorkerDetails,
    ServiceWorkerRegistrationDetails,
    sortable,
    sorter
  } from "../../../src/index.svelte";
  import { base } from "./constants.mjs";

  const source = {
    entries: [
      { a1: "1.1", a2: "1.2", a3: "1.3" },
      { a1: "2.1", a2: "2.2", a3: "2.3" },
      { a1: "3.1", a2: "3.2", a3: "3.3" },
      { a1: "4.1", /*      */ a3: "4.3" },
      { a1: "5.1", a2: "5.2", a3: "5.3" }
    ]
  };

  async function logout() {
    alert("logout");
  }

  let modal = false;
  let about = false;

  function showModal() {
    modal = true;
  }

  function showAbout() {
    about = true;
  }

  let close = () => {
    modal = false;
    about = false;
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
    memory: {
      heapTotal: 1200000,
      heapUsed: 1000000,
      rss: 0,
      external: 0,
      arrayBuffers: 1000
    }
  };

  const serverWithoutMemory = {};

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
  const serviceWorkerRegistration = readable({ scope: base }, set => {
    return () => {};
  });

  /*
  const {serviceWorker, serviceWorkerRegistration } = initializeServiceWorker("service-worker.mjs");
  */

  const sortBy = writable({});
</script>

<TopNav offset={42}>
  <a href="..">Examples</a>
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
    <li><a on:click={showModal}>Modal</a></li>
    <li><a on:click={showAbout}>About</a></li>
  </ul>
</TopNav>
<main>
  <Collapse>
    Collapse
    <ul id="collapse-content" slot="content" in:fade out:fade>
      <li>1st.</li>
      <li>2nd.</li>
    </ul>
  </Collapse>

  <tab-container>
    <div role="tablist">
      <button id="datagrid" role="tab" tabindex="0" aria-selected="true">
        Data Grid
      </button>
      <button id="byte-formatters" role="tab" tabindex="0">
        Byte Formatters
      </button>
      <button id="date-formatters" role="tab" tabindex="0">
        Date Formatters
      </button>
    </div>

    <div role="tabpanel" aria-labelledby="datagrid">
      <DataGrid {source}>
        <DataGridColumn id="col1"><div slot="header">COL1</div></DataGridColumn>
        <DataGridColumn id="col2" />
      </DataGrid>

      <input id="a1-sort" bind:value={$sortBy.a1} placeholder="sorting" />
      <input id="a2-sort" bind:value={$sortBy.a2} placeholder="sorting" />

      <table>
        <thead>
          <th id="a1" use:sortable={sortBy}>col 1</th>
          <th id="a2" use:sortable={sortBy}>col 2</th>
          <th id="a3">col 3</th>
        </thead>
        <tbody>
          {#each source.entries.sort(sorter($sortBy)) as row (row.a1)}
            <tr>
              <td>{row.a1}</td>
              <td>{row.a2}</td>
              <td>{row.a3}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div role="tabpanel" aria-labelledby="byte-formatters" hidden>
      <Bytes value="10" /> <br />
      <Bytes value="100" /> <br />
      <Bytes value="1000" /> <br />
      <Bytes value="10000" /> <br />
      <Bytes value="100000" /> <br />
      <Bytes value="1000000" /> <br />
      <Bytes value="10000000" />
    </div>

    <div role="tabpanel" aria-labelledby="date-formatters" hidden>
      <div>
        <label for="days">Days</label>
        <b><Duration id="days" seconds="1000000" /></b>
      </div>
      <div>
        <label for="hours">Hours</label>
        <b><Duration id="hours" seconds="5000" /></b>
      </div>
      <div>
        <label for="datetime">DateTime</label>
        <b><DateTime id="datetime" date={new Date()} /></b>
      </div>
    </div>
  </tab-container>

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
              size="10"
            />
          </label>
          <label for="password">
            Password 1
            <input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              size="10"
              required
            />
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
        description="a description"
      />
      <tr>
        <td />
        <td>a new entry</td>
        <td>a value</td>
      </tr>
      <SessionDetails {session} />
      <ServerDetails {server} />
      <ServerDetails server={serverWithoutMemory} />
      <ServiceWorkerDetails serviceWorker={$serviceWorker} />
      <ServiceWorkerRegistrationDetails
        serviceWorkerRegistration={$serviceWorkerRegistration}
      />
      <PeerDetails {peers} />
    </About>
  {/if}
</main>
