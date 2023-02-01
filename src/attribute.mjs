
/**
 * Split property path into tokens
 * @param {string} string
 * @return {Iterator<string>}
 */
function* tokens(string) {
  let identifier = "";

  for (const c of string) {
    switch (c) {
      case "\t":
      case " ":
        break;

      case ">":
      case "<":

      case ".":
      case "[":
      case "]":
        if (identifier.length) {
          yield identifier;
          identifier = "";
        }
        yield c;
        break;
      default:
        identifier += c;
    }
  }

  if (identifier.length) {
    yield identifier;
  }
}

/**
 * Set Object attribute.
 * The name may be a property path like 'a.b.c'.
 * @param {Object} object
 * @param {string} name
 * @param {any} value
 */
export function setAttribute(object, name, value) {
  let lastObject = object;
  let lastKey;

  for (const token of tokens(name)) {
    switch (token) {
      case ">":
      case "<":
      case ".":
      case "[":
      case "]":
        break;

      default:
        if (object[token] === undefined || typeof object[token] !== "object") {
          object[token] = {};
        }

        lastObject = object;
        lastKey = token;

        object = object[token];
    }
  }

  lastObject[lastKey] = value;
}

/**
 * Deliver attribute value.
 * The name may be a property path like 'a.b.c'.
 * @param {Object} object
 * @param {string} name
 * @returns {any} value associated with the given property name
 */
export function getAttribute(object, name) {
  if (object && object[name] !== undefined) {
    return object[name];
  }

  for (const token of tokens(name)) {
    switch (token) {
      case ">":
      case "<":
      case ".":
      case "[":
      case "]":
        break;

      default:
        if (object === undefined) {
          break;
        }

        object = object[token];
    }
  }

  return object;
}
