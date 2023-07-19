import { getAttributeAndOperator } from "./attribute.mjs";

function dateOp(value, against, op) {
  return numberOp(value.getTime(), against.getTime(), op);
}

function collectionOp(value, against, op) {
  for (const v of value) {
    if (allOp(v, against, op)) {
      return true;
    }
    return false;
  }

  return false;
}

function allOp(value, against, op) {
  switch (typeof against) {
    case "bigint":
    case "number":
      return numberOp(value, against, op);
    case "string":
      if (value instanceof Date) {
        return dateOp(value, new Date(against), op);
      }
      break;
    case "object":
      if (against instanceof RegExp) {
        return against.test(value);
      }
      if (against instanceof Date) {
        switch (typeof value) {
          case "object":
            if (value instanceof Date) {
              return dateOp(value, against, op);
            }
            break;
          case "string":
            return dateOp(new Date(value), against, op);
        }
      }
  }

  switch (typeof value) {
    case "object":
      if (Array.isArray(value) || value instanceof Set) {
        return collectionOp(value, against, op);
      }

      return value.toString().match(against);
    case "string":
      return value.match(against);
    case "bigint":
    case "number":
      return numberOp(value, against, op);
    case "boolean":
      return value == against;
  }

  return false;
}

function numberOp(value, against, op) {
  switch (op) {
    case "!=":
      return value != against;
    case "=":
      return value == against;
    case ">":
      return value > against;
    case "<":
      return value < against;
    case ">=":
      return value >= against;
    case "<=":
      return value <= against;
  }
}

/**
 * Generate filter function.
 * @param {Object} [filterBy]
 * @param {Object} [getters]
 * @returns {Function}
 */
export function filter(filterBy, getters) {
  if (filterBy) {
    const filters = Object.entries(filterBy).map(([key, against]) => {
      return a => {
        const [value, op] = getAttributeAndOperator(a, key, getters);
        return allOp(value, against, op);
      };
    });

    if (filters.length === 1) {
      return filters[0];
    }
    if (filters.length > 1) {
      return a => !filters.some(f => !f(a));
    }
  }

  return () => true;
}
