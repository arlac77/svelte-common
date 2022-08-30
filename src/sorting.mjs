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
 * Add sortable toggle button with img element to a node.
 * Synchronizes store value with node "aria-sort" attribute.
 * @param {Node} th header node
 * @param {WritableStore} to keep in sync with sorting properties
 */
export function sortable(th, store) {
  store.subscribe(orderBy =>
    th.setAttribute("aria-sort", orderBy[th.id] || SORT_NONE)
  );

  const button = document.createElement("button");
  button.setAttribute("aria-label", `sortable ${th.id}`);
  const img = document.createElement("img");
  img.setAttribute("alt", "sorting order indicator");

  button.appendChild(img);

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

      let rev = 1;

      switch (value) {
        case SORT_DESCENDING: rev = -1;
        
        case SORT_ASCENDING:
          return (a, b) => {
            const av = getter(a);
            const bv = getter(b);
            if (av === undefined) {
              return -rev;
            }
            if (bv === undefined) {
              return rev;
            }

            if (typeof av === "string") {
              return typeof bv === "string" ? av.localeCompare(bv) : rev;
            }
            if (av instanceof Date) {
              const avt = av.getTime();
              const bvt = bv.getTime();
              return avt > bvt ? rev : avt === bvt ? 0 : -rev;
            }

            return av > bv ? rev : av == bv ? 0 : -rev;
          };
      }
    }
  }
}
