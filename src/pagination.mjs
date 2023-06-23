
/**
 * Pagination support store.
 */
export class Pagination {
  subscriptions = new Set();
  data;
  itemsPerPage;
  #page = 0;

  constructor(source, itemsPerPage = 10) {
    this.data = [...source];
    this.itemsPerPage = itemsPerPage;
  }

  /**
   * Set current page
   * @param {number} n
   */
  set page(n) {
    if (this.#page !== n) {
      this.#page = n;
      this.subscriptions.forEach(subscription => subscription(this));
    }
  }

  /**
   * @return {number} current page
   */
  get page() {
    return this.#page;
  }

  subscribe(s) {
    this.subscriptions.add(s);

    s(this);

    return () => this.subscriptions.delete(s);
  }

  get numberOfPages() {
    return this.data.length / this.itemsPerPage;
  }

  *items() {
    const n = this.page;

    for (const item of this.data.slice(
      n * this.itemsPerPage,
      (n + 1) * this.itemsPerPage
    )) {
      yield item;
    }
  }

  get pageNavigationElement() {
    const nav = document.createElement("nav");
    nav.setAttribute("aria-label", "pagination");

    this.subscribe(pg => {
      const items = [];

      for (let n = 1; n < this.numberOfPages; n++) {
        if (
          this.numberOfPages > 10 &&
          (n <= 3 ||
            n > this.numberOfPages - 3 ||
            n % 10 === 0 ||
            (n < this.page + 3 && n > this.page - 3))
        ) {
          const a = document.createElement("a");
          a.setAttribute("href", "#");

          a.innerText = String(n);
          a.onclick = event => (this.page = n);
          if (n === this.page) {
            a.setAttribute("aria-current", "page");
          }
          items.push(a);
        }
      }
      nav.replaceChildren(...items);
    });

    return nav;
  }
}
