/**
 * Pagination support store.
 * Pages go from 1 ... numberOfPages
 */
export class Pagination {
  #subscriptions = new Set();
  #data;
  #unsubscribeData;

  #itemsPerPage = 1;
  #page = 1;

  constructor(data, itemsPerPage = 20) {
    this.data = data;
    this.itemsPerPage = itemsPerPage;
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
   * @deprecated
   */
  *items() {
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

      const add = (innerText, targetPage, label) => {
        const a = document.createElement("a");
        a.setAttribute("href", "#");
        if (label) {
          a.setAttribute("aria-label", label);
        }
        a.innerText = innerText;
        if (targetPage === this.page) {
          a.disabled = true;
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        } else {
          a.onclick = () => (this.page = targetPage);
        }
        items.push(a);
      };

      add("<<", 1, "First Page");
      add("<", this.page - 1, "Previous Page");

      for (let n = 1; n < this.numberOfPages; n++) {
        if (
          this.numberOfPages > 10 &&
          (n <= 3 ||
            n > this.numberOfPages - 3 ||
            n % 10 === 0 ||
            (n < this.page + 3 && n > this.page - 3))
        ) {
          add(String(n), n);
        }
      }

      add(">", this.page + 1, "Next Page");
      add(">>", this.numberOfPages, "Last Page");

      nav.replaceChildren(...items);
    });

    return nav;
  }
}

export function pageNavigation(elem, pg) {
  elem.replaceChildren(pg.pageNavigationElement);

  // TODO destroy
}
