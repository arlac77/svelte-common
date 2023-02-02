import { getAttributeAndOperator } from "./attribute.mjs";

function dateOp(a, b, op) {
  return numberOp(a.getTime(), b.getTime(), op);
}

function numberOp(a, b, op) {
  switch (op) {
    case "!=":
      return a !== b;
    case "=":
      return a === b;
    case ">":
      return a > b;
    case "<":
      return a < b;
    case ">=":
      return a >= b;
    case "<=":
      return a <= b;
  }
}

/**
 * Generate filter function.
 * @param {Object} filterBy
 * @param {Object} getters
 * @returns {Function}
 */
export function filter(filterBy, getters = {}) {
  if (filterBy) {
    const filters = Object.entries(filterBy).map(([key, value]) => {
      const getter = () => [getters[key], "="] || getAttributeAndOperator;

      return a => {
        const [av, op] = getAttributeAndOperator(a, key);

        // console.log("KEY", key, op, value, av);

        switch (typeof value) {
          case "number":
            return numberOp(av, value, op);
            break;
          case "string":
            if (av instanceof Date) {
              return dateOp(av, new Date(value), op);
            }
            break;
          case "object":
            if (value instanceof RegExp) {
              return value.test(av);
            }
            if (value instanceof Date) {
              switch (typeof av) {
                case "object":
                  if (av instanceof Date) {
                    return dateOp(av, value, op);
                  }
                  break;
                case "string":
                  return dateOp(new Date(av), value, op);
              }
            }
        }

        switch (typeof av) {
          case "object":
            return av.toString().match(value);
          case "string":
            return av.match(value);
          case "bigint":
          case "number":
            return numberOp(av, value, op);
          case "boolean":
            return av == value;
        }
        return false;
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
