
/**
 * Pagination support store
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

  get pageSelector() {
    const div = document.createElement("div");

    this.subscribe(pg => {
      const buttons = [];

      for (let n = 1; n < this.numberOfPages; n++) {
        if (
          this.numberOfPages > 10 &&
          (n <= 3 ||
            n > this.numberOfPages - 3 ||
            n % 10 === 0 ||
            (n < this.page + 3 && n > this.page - 3))
        ) {
          const button = document.createElement("button");
          button.innerText = String(n);
          button.onclick = event => (this.page = n);
          if (n === this.page) {
            button.classList.add("active");
          }
          buttons.push(button);
        }
      }
      div.replaceChildren(...buttons);
    });

    return div;
  }
}
