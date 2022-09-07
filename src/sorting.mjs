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
 * Add sortable toggle button to a th node.
 * Synchronizes store value with th nodes "aria-sort" attribute.
 * @param {Node} the header node
 * @param {WritableStore} to keep in sync with sorting properties
 */
export function sortable(th, store) {
  store.subscribe(orderBy =>
    th.setAttribute("aria-sort", orderBy[th.id] || SORT_NONE)
  );

  if (!th.getAttribute("aria-sort")) {
    th.setAttribute("aria-sort", SORT_NONE);
  }

  const button = document.createElement("button");
  button.setAttribute("aria-label", `toggle sort of ${th.id}`);
  button.setAttribute("class", "alter-sorting");
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

        if (sort !== SORT_NONE) {
          orderBy[peer.id] = sort;
        }
      }
    }
    store.set(orderBy);
  };

  th.appendChild(button);
}

/**
 * Generate a sort function for a given sort-by set.
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
        case SORT_DESCENDING:
          rev = -1;

        case SORT_ASCENDING:
          return (a, b) => {
            let av = getter(a);
            let bv = getter(b);

            if (av === undefined) {
              return -rev;
            }
            if (bv === undefined) {
              return rev;
            }

            switch (typeof av) {
              case "string":
                switch (typeof bv) {
                  case "number":
                  case "string":
                    return av.localeCompare(bv);
                }
            }

            if (av instanceof Date) {
              av = av.getTime();
            }
            if (bv instanceof Date) {
              bv = bv.getTime();
            }

            return av > bv ? rev : av == bv ? 0 : -rev;
          };
      }
    }
  }
}
