<script>
  import { fade } from "svelte/transition";
  import { readable, writable } from "svelte/store";

  import {
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
    sorter,
    SORT_ASCENDING,
    filter,
    Tabs,
    Tab,
    Pagination,
    pageNavigation
  } from "../../../src/index.svelte";
  import { base } from "./constants.mjs";

  const entries = [
    {
      a: "1.1",
      b: new Date("July 20, 2009 01:17:41 GMT+00:00"),
      c: "ca",
      d: "1.3",
      e: { f: 10000000000000n }
    },
    {
      a: "2.1",
      b: new Date("July 20, 2010 02:17:41 GMT+00:00"),
      c: "cb",
      d: "2.3",
      e: { f: 20000000000000n }
    },
    {
      a: "3.1",
      b: new Date("July 20, 2011 03:17:41 GMT+00:00"),
      c: "cc",
      d: "3.3",
      e: { f: 30000000000000n }
    },
    {
      a: "4.1",
      c: "cd",
      d: "4.3",
      e: { f: 40000000000000n }
    },
    {
      a: "5.1",
      b: new Date("July 20, 2012 05:17:41 GMT+00:00"),
      c: "ce",
      d: "5.3",
      e: { f: 50000000000000n }
    },
    {
      a: "6.1",
      b: new Date("July 20, 2013 05:17:41 GMT+00:00"),
      c: "cf",
      d: "6.3",
      e: { f: 60000000000000n }
    },
    {
      a: "7.1",
      b: new Date("July 20, 2014 05:17:41 GMT+00:00"),
      c: "cg",
      d: "7.3",
      e: { f: 70000000000000n }
    },
    {
      a: "8.1",
      b: new Date("July 20, 2015 05:17:41 GMT+00:00"),
      c: "ch",
      d: "8.3",
      e: { f: 80000000000000n }
    }
  ];

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

  const sortBy = writable({ a: SORT_ASCENDING });
  const filterBy = writable({ a: "" });

  const pg = new Pagination(entries, { itemsPerPage: 8 });

  $: pg.filter = filter($filterBy);
  $: pg.sorter = sorter($sortBy);
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

  <Tabs>
    <Tab id="t1"><button slot="header">Tab 1</button>content tab 1</Tab>
    <Tab id="t2"><button slot="header">Tab 2</button>content tab 2</Tab>
    <Tab id="t3"><button slot="header">Tab 3</button>content tab 3</Tab>
  </Tabs>

  <tab-container>
    <div role="tablist">
      <button id="table" role="tab" tabindex="0" aria-selected="true">
        Table
      </button>
      <button id="byte-formatters" role="tab" tabindex="0">
        Byte Formatters
      </button>
      <button id="date-formatters" role="tab" tabindex="0">
        Date Formatters
      </button>
    </div>

    <div role="tabpanel" aria-labelledby="table">
      <input id="sort-a" bind:value={$sortBy.a} placeholder="sorting a" />
      <input id="sort-b" bind:value={$sortBy.b} placeholder="sorting b" />
      <input id="sort-c" bind:value={$sortBy.c} placeholder="sorting c" />
      <input
        id="sort-e"
        bind:value={$sortBy["e.f"]}
        placeholder="sorting e.f"
      />

      <table>
        <thead>
          <tr>
            <th id="a" use:sortable={sortBy}
              >col 1<search
                ><label>
                  <input
                    id="filter-a"
                    bind:value={$filterBy.a}
                    placeholder="filter a"
                  /></label
                ></search
              ></th
            >
            <th id="b" use:sortable={sortBy}
              >col 2<search
                ><label
                  ><input
                    id="filter-b"
                    type="date"
                    bind:value={$filterBy["b<"]}
                    placeholder="filter b"
                  /></label
                ></search
              ></th
            >
            <th id="c" use:sortable={sortBy}>col 3</th>
            <th
              >col 4<search
                ><label
                  ><input
                    id="filter-d"
                    type="number"
                    bind:value={$filterBy["d>"]}
                    placeholder="filter d>"
                  /></label
                ></search
              ></th
            >
            <th id="e.f" use:sortable={sortBy}>col 5</th>
          </tr>
        </thead>
        <tbody>
          {#each [...pg] as row, i (row.a)}
            <tr>
              <td id="a{i}">{row.a}</td>
              <td id="b{i}"><DateTime id="datetime" date={row.b} /></td>
              <td id="c{i}">{row.c}</td>
              <td id="d{i}">{row.d}</td>
              <td id="e{i}">{row.e.f}</td>
            </tr>
          {/each}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" use:pageNavigation={pg} />
          </tr>
        </tfoot>
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
        <label
          >days
          <b><Duration id="days" seconds="1000000" /></b>
        </label>
      </div>
      <div>
        <label>
          hours
          <b><Duration id="hours" seconds="5000" /></b>
        </label>
      </div>
      <div>
        <label
          >datetime
          <b><DateTime id="datetime" date={new Date()} /></b>
        </label>
      </div>
    </div>
  </tab-container>

  {#if modal}
    <Modal {close}>
      <form>
        <fieldset>
          <label>
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
          <label>
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
