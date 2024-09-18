import { getAttribute } from "pacc";
import { writable } from "svelte/store";

export const SORT_NONE = "none";
export const SORT_ASCENDING = "ascending";
export const SORT_DESCENDING = "descending";
export const SORT_OTHER = "other";

export const orderByCycle = {
  [SORT_NONE]: SORT_ASCENDING,
  [SORT_ASCENDING]: SORT_DESCENDING,
  [SORT_DESCENDING]: SORT_ASCENDING
};

const ARIA_SORT = "aria-sort";

/**
 * Deliver next value in the order by cycle.
 * SORT_NONE -> SORT_ASCENDING -> SORT_DESCENDING -> SORT_NONE ...
 * @param {string|null} [orderBy]
 * @returns {string} new order either SORT_NONE, SORT_ASCENDING or SORT_DESCENDING
 */
export function toggleOrderBy(orderBy) {
  return orderByCycle[orderBy] || SORT_NONE;
}

/**
 * Add sortable toggle button to a th node.
 * Synchronizes store value with the nodes "aria-sort" attribute.
 * Usable as svelte action function.
 * @param {Element} th the header element
 * @param {writable} store keep in sync with sorting properties
 * @return {Object} with destroy function
 */
export function sortable(th, store) {
  const destroy = store.subscribe(orderBy =>
    th.setAttribute(ARIA_SORT, orderBy[th.id] || SORT_NONE)
  );

  if (!th.getAttribute(ARIA_SORT)) {
    th.setAttribute(ARIA_SORT, SORT_NONE);
  }

  const button = document.createElement("button");
  button.setAttribute("aria-label", `toggle sort of ${th.id}`);
  button.setAttribute("class", "alter-sorting");
  button.onclick = () => {
    const orderBy = {};

    th.setAttribute(ARIA_SORT, toggleOrderBy(th.getAttribute(ARIA_SORT)));

    for (const peer of th.parentElement.children) {
      let sort = peer.getAttribute(ARIA_SORT);

      if (sort) {
        if (peer !== th && sort !== SORT_NONE) {
          sort = SORT_NONE;
          peer.setAttribute(ARIA_SORT, sort);
        }

        if (sort !== SORT_NONE) {
          orderBy[peer.id] = sort;
        }
      }
    }
    store.set(orderBy);
  };

  th.appendChild(button);

  return {
    destroy
  };
}

/**
 * Generate a sort function for a given sort-by set.
 * @param {Object|undefined} [sortBy]
 * @param {Object} [getters]
 * @return {(function(any,any):number)|undefined} sorter
 */
export function sorter(sortBy, getters) {
  if (sortBy) {
    for (const [key, value] of Object.entries(sortBy)) {
      const getter = getters?.[key] || getAttribute;

      let rev = 1;

      switch (value) {
        case SORT_DESCENDING:
          rev = -1;

        case SORT_ASCENDING:
          return (a, b) => {
            let av = getter(a, key);
            let bv = getter(b, key);

            switch (typeof av) {
              case "undefined":
                return bv === undefined ? 0 : -rev;
              case "string":
                switch (typeof bv) {  
                  case "number":
                    bv = String(bv);
                  case "string":
                    const r = av.localeCompare(bv);
                    return r ? r * rev : r;
                }
            }

            if (bv === undefined) {
              return rev;
            }

            av = av[Symbol.toPrimitive] ? av[Symbol.toPrimitive]("number") : av.toString();
            bv = bv[Symbol.toPrimitive] ? bv[Symbol.toPrimitive]("number") : bv.toString();

            return av > bv ? rev : av == bv ? 0 : -rev;
          };
      }
    }
  }
}
