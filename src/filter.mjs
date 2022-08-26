export function filter(filterBy, getters = {}) {
  if (filterBy) {
    for (const [key, value] of Object.entries(filterBy)) {
      const getter = getters[key] || (object => object && object[key]);

      return a => getter(a)?.match(value);
    }
  }

  return () => true;
}
