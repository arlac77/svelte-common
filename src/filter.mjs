export function filter(filterBy) {
  if (filterBy) {
    for (const [key, value] of Object.entries(filterBy)) {
      return (a) => a && a[key]?.match(value)
    }
  }
 
  return () => true;
}