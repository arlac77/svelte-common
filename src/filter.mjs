export function filter(filterBy) {
  if (filterBy) {
    for (const [key, value] of Object.entries(filterBy)) {
      return (a) => a[key] && a[key].match(value)
    }
  }
 
  return () => true;
}