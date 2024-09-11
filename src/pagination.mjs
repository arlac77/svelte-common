import { readable } from "svelte/store";

/**
 * Pagination support store.
 * Pages go from 1 ... numberOfPages
 * @param {Map|Set|Array|readable} data
 * @param {Object} options
 * @param {number} [options.itemsPerPage]
 * @param {number} [options.page] current page
 * @param {Function} [options.sorter]
 * @param {Function} [options.filter]
 */
export class Pagination {
  #subscriptions = new Set();
  #data;
  #unsubscribeData;
  #filter;
  #unsubscribeFilter;
  #sorter;
  #unsubscribeSorter;
  #itemsPerPage = 20;
  #page = 1;

  constructor(data = [], options) {
    this.data = data;

    Object.assign(this, options);
  }

  fireSubscriptions() {
    this.#subscriptions.forEach(subscription => subscription(this));
  }

  set filter(filter) {
    if (this.#unsubscribeFilter) {
      this.#unsubscribeFilter();
      this.#unsubscribeFilter = undefined;
    }

    const applyFilter = filter => {
      this.#filter = filter;
      this.recalibrateCurrentPage();
      this.fireSubscriptions();
    };

    if (filter?.subscribe) {
      this.#unsubscribeFilter = filter.subscribe(applyFilter);
    } else {
      applyFilter(filter);
    }
  }

  get filter() {
    return this.#filter;
  }

  set sorter(sorter) {
    if (this.#unsubscribeSorter) {
      this.#unsubscribeSorter();
      this.#unsubscribeSorter = undefined;
    }

    const applySorter = sorter => {
      this.#sorter = sorter;
      this.fireSubscriptions();
    };

    if (sorter?.subscribe) {
      this.#unsubscribeFilter = sorter.subscribe(applySorter);
    } else {
      applySorter(sorter);
    }
  }

  get sorter() {
    return this.#sorter;
  }

  /**
   * Enshure that current page lies inside 1 ... numberOfPages
   */
  recalibrateCurrentPage() {
    if (this.page > this.numberOfPages) {
      this.page = this.numberOfPages;
    }
  }

  set data(data) {
    if (this.#unsubscribeData) {
      this.#unsubscribeData();
      this.#unsubscribeData = undefined;
    }

    const d = data => {
      this.#data = data;
      this.recalibrateCurrentPage();
      this.fireSubscriptions();
    };

    if (data?.subscribe) {
      this.#unsubscribeData = data.subscribe(newData => d(newData));
    } else {
      d(data);
    }
  }

  get itemsPerPage() {
    return this.#itemsPerPage;
  }

  set itemsPerPage(n) {
    if (this.#itemsPerPage != n) {
      this.#itemsPerPage = n;
      this.fireSubscriptions();
    }
  }

  /**
   * Set current page.
   * First page has number 1.
   * @param {number} n
   */
  set page(n) {
    const numberOfPages = this.numberOfPages;

    if (n < 0) {
      n = numberOfPages + n + 1;
    } else {
      if (n > numberOfPages) {
        n = numberOfPages;
      }
    }
    if (this.#page !== n) {
      if (n >= 1 && n <= numberOfPages) {
        this.#page = n;
        this.fireSubscriptions();
      }
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

  /**
   * Total number of items (filtered).
   * @return {number}
   */
  get numberOfItems() {
    if (this.filter) {
      const data = Array.isArray(this.#data)
        ? this.#data
        : [...this.#data.values()];
      return data.filter(this.filter).length;
    }

    return Array.isArray(this.#data) ? this.#data.length : this.#data.size;
  }

  /**
   *
   * @param {number} page 1...
   * @returns {[number,number]}
   */
  itemRangeOnPage(page) {
    return [(this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage];
  }

  /**
   * @return {number}
   */
  get numberOfPages() {
    return Math.ceil(this.numberOfItems / this.itemsPerPage);
  }

  /**
   * Deliver items per page.
   * @see {itemsPerPage}
   * @return {number}
   */
  get length() {
    return this.#itemsPerPage;
  }

  get filteredItems() {
    let items = Array.isArray(this.#data)
      ? this.#data
      : [...this.#data.values()];

    if (this.filter) {
      return items.filter(this.filter);
    }

    return items;
  }

  *[Symbol.iterator]() {
    let data = this.filteredItems;

    if (this.sorter) {
      data = data.sort(this.sorter);
    }

    yield* data.slice(...this.itemRangeOnPage(this.page))[Symbol.iterator]();
  }

  /**
   * @see https://getbootstrap.com/docs/4.0/components/pagination
   * @see https://a11y-style-guide.com/style-guide/section-navigation.html#kssref-navigation-pagination
   */
  get pageNavigationElement() {
    const nav = document.createElement("nav");
    nav.setAttribute("tabindex", "0");
    nav.setAttribute("aria-label", "pagination");

    nav.onkeyup = event => {
      const step = event.altKey ? 10 : 1;

      switch (event.key) {
        case "ArrowLeft":
          this.page = this.page - step;
          break;
        case "ArrowRight":
          this.page = this.page + step;
          break;
      }
    };

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
          a.setAttribute("aria-disabled", "true");
          a.tabIndex = -1;
        } else {
          if (targetPage === this.page) {
            a.classList.add("active");
            a.setAttribute("aria-disabled", "true");
            a.setAttribute("aria-current", "page");
          } else {
            a.onclick = e => {
              e.preventDefault();
              nav.focus({ focusVisible: true });
              this.page = targetPage;
            };
          }
        }
        items.push(a);
      };

      if (np > 1) {
        add("<<", 1, "First Page");
        add("<", this.page - 1, "Previous Page");

        for (const n of navigationItems(np, this.page)) {
          add(String(n), n);
        }

        add(">", this.page + 1, "Next Page");
        add(">>", np, "Last Page");
      }
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
 * Generade actual sequence of page numbers to navigate to.
 * @param {number} numberOfPages
 * @param {number} currentPage
 * @param {number} numberOfItems
 * @return {Iterable<number>}
 */
export function* navigationItems(
  numberOfPages,
  currentPage,
  numberOfItems = 7
) {
  const edge = 2;
  const side = 1;
  const step = numberOfPages >= 80 ? Math.floor(numberOfPages / 10) : undefined;

  for (let n = 1; n <= numberOfPages; n++) {
    if (
      n <= edge ||
      n > numberOfPages - edge ||
      n % step === 0 ||
      (n < currentPage + side && n > currentPage - side)
    ) {
      yield n;
    }
  }
}
