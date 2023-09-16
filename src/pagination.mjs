/**
 * Pagination support store.
 * Pages go from 1 ... numberOfPages
 * @param {Map|Array|Store} data
 * @param {Object} options
 * @param {number} [options.itemsPerPage]
 * @param {Function} [options.sorter]
 * @param {Function} [options.filter]
 */
export class Pagination {
  #subscriptions = new Set();
  #data;
  #unsubscribeData;
  #filter;
  #sorter;
  #itemsPerPage = 20;
  #page = 1;

  constructor(data, options) {
    this.data = data;

    Object.assign(this, options);
  }

  fireSubscriptions() {
    this.#subscriptions.forEach(subscription => subscription(this));
  }

  set filter(filter) {
    this.#filter = filter;
    this.fireSubscriptions();
  }

  get filter() {
    return this.#filter;
  }

  set sorter(sorter) {
    this.#sorter = sorter;
    this.fireSubscriptions();
  }

  get sorter() {
    return this.#sorter;
  }

  set data(data) {
    if (this.#unsubscribeData) {
      this.#unsubscribeData();
      this.#unsubscribeData = undefined;
    }

    if (data?.subscribe) {
      this.#unsubscribeData = data.subscribe(newData => {
        this.#data = newData;
        if (this.page > this.numberOfPages) {
          this.page = this.numberOfPages;
        }
      });
    } else {
      this.#data = data;
      if (this.page > this.numberOfPages) {
        this.page = this.numberOfPages;
      }
    }

    this.fireSubscriptions();
  }

  get itemsPerPage() {
    return this.#itemsPerPage;
  }

  set itemsPerPage(n) {
    this.#itemsPerPage = n;
    this.fireSubscriptions();
  }

  /**
   * Set current page
   * @param {number} n
   */
  set page(n) {
    if (n < 0) {
      n = this.numberOfPages + n + 1;
    }

    if (this.#page !== n) {
      if (n >= 1 && n <= this.numberOfPages) {
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
   * @return {number}
   */
  get numberOfPages() {
    let n;

    if (this.filter) {
      let data = Array.isArray(this.data)
        ? this.#data
        : [...this.#data.values()];
      data = data.filter(this.filter);
      n = data.length;
    } else {
      n = Array.isArray(this.#data) ? this.#data.length : this.#data.size;
    }

    return Math.ceil(n / this.itemsPerPage);
  }

  /**
   * Deliver items per page.
   * @see {itemsPerPage}
   * @return {number}
   */
  get length() {
    return this.#itemsPerPage;
  }

  *[Symbol.iterator]() {
    let data = Array.isArray(this.data) ? this.#data : [...this.#data.values()];

    if (this.filter) {
      data = data.filter(this.filter);
    }

    if (this.sorter) {
      data = data.sort(this.sorter);
    }

    const n = this.page - 1;

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
              e.stopPropagation();
              this.page = targetPage;
            };
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
 * Generade actual sequence of page numbers to navigate to.
 * @param {number} numberOfPages
 * @param {number} currentPage
 * @param {number} numberOfItems
 * @return {Iterator<number>}
 */
export function* navigationItems(
  numberOfPages,
  currentPage,
  numberOfItems = 7
) {
  const edge = 2;
  const side = 1;
  const step = numberOfPages >= 100 ? Math.floor(numberOfPages / 10) : undefined;

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

  /*  
  const pageJumps = [
    { maxPages: 10, stepping: [1] },
    { maxPages: 100, stepping: [1, 10] },
    { maxPages: 1000, stepping: [1, 10, 100] },
    { maxPages: 10000, stepping: [1, 100, 1000] },
    { maxPages: 100000, stepping: [1, 1000, 10000] }
  ];

  for (const j of pageJumps) {
    if (numberOfPages <= j.maxPages) {
      yield 1;
      for (const s of j.stepping) {
        for (let n = currentPage - s; n < currentPage + s; n++) {
          yield n;
        }
        yield currentPage;
      }

      yield numberOfPages;

      break;
    }
  }
  */
}
