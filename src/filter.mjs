import { getAttributeAndOperator } from "./attribute.mjs";

function dateOp(value, against, op) {
  return numberOp(value.getTime(), against.getTime(), op);
}

function collectionOp(value, against, op) {
  for (const v of value) {
    if (allOp(v, against, op)) {
      return true;
    }
  }

  return false;
}

function allOp(value, against, op) {
  switch (typeof value) {
    case "object":
      if (Array.isArray(value) || value instanceof Set) {
        return collectionOp(value, against, op);
      }
      if (value instanceof Map) {
        return collectionOp(value.keys(), against, op);
      }

      switch (typeof against) {
        case "object":
          if (value[Symbol.toPrimitive] && against[Symbol.toPrimitive]) {
            return numberOp(
              value[Symbol.toPrimitive]("number"),
              against[Symbol.toPrimitive]("number"),
              op
            );
          }
          break;

        case "number":
          if (value[Symbol.toPrimitive]) {
            return allOp(
              value[Symbol.toPrimitive](typeof against),
              against,
              op
            );
          }
      }

      if (value instanceof Date) {
        switch (typeof against) {
          case "string":
            return dateOp(value, new Date(against), op);
          case "object":
            if (against instanceof Date) {
              return dateOp(value, against, op);
            }
        }
      }

      return value.toString().match(against);
    case "string":
      switch (typeof against) {
        case "bigint":
        case "number":
          return numberOp(value, against, op);
        case "object":
          if (against instanceof Date) {
            return dateOp(new Date(value), against, op);
          }

          if (against instanceof RegExp) {
            return against.test(value);
          }

          if (Array.isArray(against) || against instanceof Set) {
            for (const i of against) {
              if (value.match(i)) {
                return true;
              }
            }
          }
      }

      return value.match(against);
    case "bigint":
    case "number":
      if (against instanceof RegExp) {
        return against.test(value);
      }

      if (Array.isArray(against) || against instanceof Set) {
        for (const i of against) {
          if (numberOp(value, i, op)) {
            return true;
          }
        }
      }

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
