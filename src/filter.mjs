import { getAttributeAndOperator } from "./attribute.mjs";

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

        //console.log("KEY", key, op, value, av);

        if (value instanceof RegExp) {
          return value.test(av);
        }
        if (value instanceof Date) {
          switch (typeof av) {
            case "object":
              if (av instanceof Date) {
                switch (op) {
                  case "=":
                    return av.getTime() == value.getTime();
                  case ">":
                    return av.getTime() > value.getTime();
                  case "<":
                    return av.getTime() < value.getTime();
                }
              }
              break;
            case "string":
              return value.toString().match(av);
          }
        }

        switch (typeof av) {
          case "object":
            return av.toString().match(value);
          case "string":
            return av.match(value);
          case "bigint":
          case "number":
            switch (op) {
            /*  case "=":
                return av == value;*/
              case ">":
                return av > value;
              case "<":
                return av < value;
            }
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
