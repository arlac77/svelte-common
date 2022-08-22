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
 * cycles "aria-sort" though orderByCycle.
 * @param {Node} node
 * @param {Store} where to put sorting info into
 */
export function sortable(node, store) {
  node.setAttribute("aria-sort", SORT_NONE);

  node.onclick = () => {
    const orderBy = {};
    node.setAttribute(
      "aria-sort",
      toggleOrderBy(node.getAttribute("aria-sort"))
    );

    for (const peer of node.parentElement.children) {
      if (peer !== node) {
        if (peer.getAttribute("aria-sort") !== SORT_NONE) {
          peer.setAttribute("aria-sort", SORT_NONE);
        }
      }

      orderBy[peer.id] = peer.getAttribute("aria-sort");
    }
    store.set(orderBy);
  };
}

export function sortableStore() {
  const subscriptions = new Set();

  let value = {};

  return {
    subscribe: cb => {
      subscriptions.add(cb);
      cb(value);
      return () => subscriptions.delete(cb);
    },
    set(v) {
      value = v;
      subscriptions.forEach(subscription => subscription(value));
    }
  };
}
