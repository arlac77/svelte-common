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
  return orderByCycle[orderBy] || "none";
}

/**
 * Add sortable toggle to a node.
 * cycles "aria-sort" though orderByCycle.
 * @param {Node} node
 */
export function sortable(node) {
  node.setAttribute("aria-sort", SORT_NONE);

  node.onclick = () => {
    node.setAttribute("aria-sort", toggleOrderBy(node.getAttribute("aria-sort")));
  };
}
