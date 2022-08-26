export function filter(filterBy, getters = {}) {
  if (filterBy) {
    const filters = Object.entries(filterBy).map(([key, value]) => {
      const getter = getters[key] || (object => object && object[key]);
      return a => getter(a)?.match(value);
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
