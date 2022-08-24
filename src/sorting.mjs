export const SORT_NONE = "none";
export const SORT_ASCENDING = "ascending";
export const SORT_DESCENDING = "descending";
export const SORT_OTHER = "other";

export const orderByCycle = {
  [SORT_NONE]: SORT_ASCENDING,
  [SORT_ASCENDING]: SORT_DESCENDING,
  [SORT_DESCENDING]: SORT_NONE
};

/**
 * Deliver next value in the order by cycle.
 * SORT_NONE -> SORT_ASCENDING -> SORT_DESCENDING -> SORT_NONE ...
 * @param {string} orderBy
 * @returns {string} new order either SORT_NONE, SORT_ASCENDING or SORT_DESCENDING
 */
export function toggleOrderBy(orderBy) {
  return orderByCycle[orderBy] || SORT_NONE;
}

/**
 * Add sortable toggle to a node.
 * Synchronizes store value with node "aria-sort" attribute.
 * @param {Node} node
 * @param {WritableStore} to keep in sync with sorting properties
 */
export function sortable(node, store) {
  node.setAttribute("aria-sort", SORT_NONE);

  store.subscribe(orderBy => {
    for (const peer of node.parentElement.children) {
      if (peer.getAttribute("aria-sort")) {
        peer.setAttribute("aria-sort", orderBy[peer.id] || SORT_NONE);
      }
    }
  });

  node.onclick = () => {
    const orderBy = {};

    node.setAttribute(
      "aria-sort",
      toggleOrderBy(node.getAttribute("aria-sort"))
    );

    for (const peer of node.parentElement.children) {
      let sort = peer.getAttribute("aria-sort");

      if (sort) {
        if (peer !== node) {
          if (sort !== SORT_NONE) {
            sort = SORT_NONE;
            peer.setAttribute("aria-sort", sort);
          }
        }

        orderBy[peer.id] = sort;
      }
    }
    store.set(orderBy);
  };
}

/**
 * Generate a sort function for a given sort by set.
 * @param {Object} sortBy
 * @param {Object} getters
 * @return {Function} sorter
 */
export function sorter(sortBy, getters = {}) {
  if (sortBy) {
    for (const [key, value] of Object.entries(sortBy)) {
      const getter = getters[key] || (object => object[key]);

      switch (value) {
        case SORT_ASCENDING:
          return (a, b) => {
            const av = getter(a);
            const bv = getter(b);
            return av === undefined ? -1 : av.localeCompare(bv);
          };

        case SORT_DESCENDING:
          return (b, a) => {
            const av = getter(a);
            const bv = getter(b);
            return av === undefined ? -1 : av.localeCompare(bv);
          };
      }
    }
  }
}
