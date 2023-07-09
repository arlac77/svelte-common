/**
 * Pagination support store.
 * Pages go from 1 ... numberOfPages
 * @param {Map|Array|Store} data
 * @param {Object} options
 * @param {number} [options.itemsPerPage]
 */
export class Pagination {
  #subscriptions = new Set();
  #data;
  #unsubscribeData;

  #itemsPerPage = 20;
  #page = 1;

  constructor(data, options) {
    this.data = data;
    if (options?.itemsPerPage) {
      this.itemsPerPage = options.itemsPerPage;
    }
  }

  set data(data) {
    if (this.#unsubscribeData) {
      this.#unsubscribeData();
      this.#unsubscribeData = undefined;
    }

    if (data?.subscribe) {
      this.#unsubscribeData = data.subscribe(newData => {
        this.#data = newData;
      });
    } else {
      this.#data = data;
    }

    this.#subscriptions.forEach(subscription => subscription(this));
  }

  get itemsPerPage() {
    return this.#itemsPerPage;
  }

  set itemsPerPage(n) {
    this.#itemsPerPage = n;
    this.#subscriptions.forEach(subscription => subscription(this));
  }

  /**
   * Set current page
   * @param {number} n
   */
  set page(n) {
    if (this.#page !== n && n >= 1 && n <= this.numberOfPages) {
      this.#page = n;
      this.#subscriptions.forEach(subscription => subscription(this));
    }
  }

  /**
   * @return {number} current page
   */
  get page() {
    return this.#page;
  }

  subscribe(s) {
    this.#subscriptions.add(s);

    s(this);

    return () => this.#subscriptions.delete(s);
  }

  get numberOfPages() {
    return Math.ceil(
      (Array.isArray(this.#data) ? this.#data.length : this.#data.size) /
        this.itemsPerPage
    );
  }

  get length() {
    return this.#itemsPerPage;
  }

  *[Symbol.iterator]() {
    const n = this.page - 1;

    const data = Array.isArray(this.data)
      ? this.#data
      : [...this.#data.values()];

    for (const item of data.slice(
      n * this.itemsPerPage,
      (n + 1) * this.itemsPerPage
    )) {
      yield item;
    }
  }

  /**
   * @see @link https://getbootstrap.com/docs/4.0/components/pagination
   * @see @link https://a11y-style-guide.com/style-guide/section-navigation.html#kssref-navigation-pagination
   */
  get pageNavigationElement() {
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "pagination");

    this.subscribe(pg => {
      const items = [];
      const np = this.numberOfPages;

      const add = (innerText, targetPage, label) => {
        const a = document.createElement("a");
        a.setAttribute("href", "#");
        if (label) {
          a.setAttribute("aria-label", label);
        }
        a.innerText = innerText;

        if (targetPage < 1 || targetPage > np) {
          a.disabled = true;
        } else {
          if (targetPage === this.page) {
            a.disabled = true;
            a.classList.add("active");
            a.setAttribute("aria-current", "page");
          } else {
            a.onclick = () => (this.page = targetPage);
          }
        }
        items.push(a);
      };

      add("<<", 1, "First Page");
      add("<", this.page - 1, "Previous Page");

      for (const n of navigationItems(np, this.page)) {
        add(String(n), n);
      }

      add(">", this.page + 1, "Next Page");
      add(">>", np, "Last Page");

      nav.replaceChildren(...items);
    });

    return nav;
  }
}

export function pageNavigation(elem, pg) {
  elem.replaceChildren(pg.pageNavigationElement);

  // TODO destroy
}

/**
 * Generade actual sequence of page numbers to navigate to
 * @param {number} nunmberOfPages
 * @param {number} currentPage
 * @return {Iterator<number>}
 */
export function* navigationItems(nunmberOfPages, currentPage) {
  const pageJumps = [
    { maxPages: 10,       side: 1, edge: 2 },
    { maxPages: 100,      side: 1, edge: 2, step: 10 },
    { maxPages: 1000,     side: 1, edge: 2, step: 100 },
    { maxPages: 10000,    side: 1, edge: 2, step: 1000 },
    { maxPages: 100000,   side: 1, edge: 2, step: 10000 },
    { maxPages: 1000000,  side: 1, edge: 2, step: 100000 },
    { maxPages: 10000000, side: 1, edge: 2, step: 1000000 }
  ];

  for (const j of pageJumps) {
    if (nunmberOfPages <= j.maxPages) {
      for (let n = 1; n <= nunmberOfPages; n++) {
        if (
          n <= j.edge ||
          n > nunmberOfPages - j.edge ||
          n % j.step === 0 ||
          (n < currentPage + j.side && n > currentPage - j.side)
        ) {
          yield n;
        }
      }
      break;
    }
  }
}
