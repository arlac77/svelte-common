/**
 * Generate filter function
 * @param {Object} filterBy
 * @param {Object} getters
 * @returns {Function}
 */
export function filter(filterBy, getters = {}) {
  if (filterBy) {
    const filters = Object.entries(filterBy).map(([key, value]) => {
      const getter = getters[key] || (object => object && object[key]);
      return a => {
        const av = getter(a);

        if (value instanceof RegExp) {
          return value.test(av);
        }

        switch (typeof av) {
          case "object":
            return av.toString().match(value);
          case "string":
            return av.match(value);
          case "bigint":
          case "number":
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
