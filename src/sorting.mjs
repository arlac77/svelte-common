export const SORT_NONE = "none";
export const SORT_ASCENDING = "ascending";
export const SORT_DESCENDING = "descending";
export const SORT_OTHER = "other";

export const orderByCycle = {
  [SORT_NONE]: SORT_ASCENDING,
  [SORT_ASCENDING]: SORT_DESCENDING,
  [SORT_DESCENDING]: SORT_ASCENDING
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
 * Add sortable toggle button to a node.
 * Synchronizes store value with node "aria-sort" attribute.
 * @param {Node} th header node
 * @param {WritableStore} to keep in sync with sorting properties
 */
export function sortable(th, store) {
  const button = document.createElement("button");
  const img = document.createElement("img");
  button.appendChild(img);

  store.subscribe(orderBy =>
    th.setAttribute("aria-sort", orderBy[th.id] || SORT_NONE)
  );

  button.onclick = () => {
    const orderBy = {};

    th.setAttribute("aria-sort", toggleOrderBy(th.getAttribute("aria-sort")));

    for (const peer of th.parentElement.children) {
      let sort = peer.getAttribute("aria-sort");

      if (sort) {
        if (peer !== th) {
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

  th.appendChild(button);
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
            if (av === undefined) {
              return -1;
            }
            if (bv === undefined) {
              return 1;
            }

            if (typeof av === "string") {
              return typeof bv === "string" ? av.localeCompare(bv) : 1;
            }
            if (av instanceof Date) {
              const avt = av.getTime();
              const bvt = bv.getTime();
              return avt > bvt ? 1 : avt === bvt ? 0 : -1;
            }

            return av > bv ? 1 : av == bv ? 0 : -1;
          };

        case SORT_DESCENDING:
          return (b, a) => {
            const av = getter(a);
            const bv = getter(b);
            if (av === undefined) {
              return -1;
            }
            if (bv === undefined) {
              return 1;
            }

            if (typeof av === "string") {
              return typeof bv === "string" ? av.localeCompare(bv) : 1;
            }
            if (av instanceof Date) {
              const avt = av.getTime();
              const bvt = bv.getTime();
              return avt > bvt ? 1 : avt === bvt ? 0 : -1;
            }

            return av > bv ? 1 : av == bv ? 0 : -1;
          };
      }
    }
  }
}
