import {
  getAttributeAndOperator,
  EQUAL,
  NOT_EQUAL,
  LESS,
  LESS_EQUAL,
  GREATER,
  GREATER_EQUAL
} from "pacc";

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
    case "undefined":
      return false;

    case "object":
      if (value === null) {
        return false;
      }

      if (value instanceof Map) {
        return collectionOp(value.keys(), against, op);
      }
      if (value instanceof RegExp) {
        return value.test(against);
      }
      if (value[Symbol.iterator]) {
        return collectionOp(value, against, op);
      }

      switch (typeof against) {
        case "object":
          if (value instanceof Date) {
            if (
              Array.isArray(against) &&
              against[0] instanceof Date &&
              against[1] instanceof Date
            ) {
              return dateOp(value, against[0], GREATER_EQUAL) && dateOp(value, against[1], LESS_EQUAL);
            }

            if (against instanceof Date) {
              return dateOp(value, against, op);
            }
          }

          if (value[Symbol.toPrimitive] && against[Symbol.toPrimitive]) {
            return numberOp(
              value[Symbol.toPrimitive]("number"),
              against[Symbol.toPrimitive]("number"),
              op
            );
          }
          break;

        case "bigint":
        case "number":
          return allOp(value[Symbol.toPrimitive]("number"), against, op);

        case "string":
          if (against.length === 0) {
            return true;
          }

          if (value instanceof Date) {
            return dateOp(value, new Date(against), op);
          }
          break;
        case "boolean":
          return numberOp(value ? true : false, against, op);
      }

      if (against instanceof RegExp) {
        return against.test(value.toString());
      }

      return value.toString().match(against);
    case "string":
      switch (typeof against) {
        case "boolean":
          return numberOp(value.length !== 0, against, op);
        case "string":
          if (
            op === EQUAL &&
            (against.length === 0 || value.indexOf(against) >= 0)
          ) {
            return true;
          }

          if (!value.match(/^-?\d/)) {
            break;
          }
        case "bigint":
        case "number":
          return value.length ? numberOp(value, against, op) : true;
        case "object":
          if (value.length === 0) {
            return false;
          }

          if (against instanceof Date) {
            return dateOp(new Date(value), against, op);
          }

          if (against instanceof RegExp) {
            return against.test(value);
          }

          if (against instanceof Map) {
            for (const [k, v] of against) {
              if (allOp(value, k, op) || allOp(value, v, op)) {
                return true;
              }
            }
          }

          if (against[Symbol.iterator]) {
            for (const i of against) {
              if (allOp(value, i, op)) {
                return true;
              }
            }
            return false;
          }
      }

      return value.match(against);
    case "bigint":
    case "number":
      switch (typeof against) {
        case "object":
          if (against instanceof RegExp) {
            return against.test(String(value));
          }

          if (against instanceof Map) {
            for (const [k, v] of against) {
              if (numberOp(value, k, op) || numberOp(value, v, op)) {
                return true;
              }
            }
            return false;
          }

          if (against[Symbol.iterator]) {
            for (const i of against) {
              if (numberOp(value, i, op)) {
                return true;
              }
            }
            return false;
          }
      }
      return numberOp(value, against, op);
    case "boolean":
      switch (typeof against) {
        case "object":
          if (against[Symbol.iterator]) {
            for (const i of against) {
              if (allOp(value, i, op)) {
                return true;
              }
            }
          }
          break;
      }

      return value == against;
  }

  return false;
}

function numberOp(value, against, op) {
  switch (op) {
    case NOT_EQUAL:
      return value != against;
    case EQUAL:
      return value == against;
    case GREATER:
      return value > against;
    case LESS:
      return value < against;
    case GREATER_EQUAL:
      return value >= against;
    case LESS_EQUAL:
      return value <= against;
  }
}

/**
 * Generate filter function.
 * @param {Object} [filterBy]
 * @returns {Function}
 */
export function filter(filterBy) {
  if (filterBy) {
    const filters = Object.entries(filterBy).map(([key, against]) => {
      return a => {
        const [value, op] = getAttributeAndOperator(a, key);
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
