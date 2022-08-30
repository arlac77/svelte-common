export function filter(filterBy, getters = {}) {
  if (filterBy) {
    const filters = Object.entries(filterBy).map(([key, value]) => {
      const getter = getters[key] || (object => object && object[key]);
      return a => {
        const av = getter(a);

        switch (typeof av) {
          case "object":
            return av.toString().match(value);
          case "string":
            return av.match(value);
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
