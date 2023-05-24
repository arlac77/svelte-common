/**
 * @typedef {Object} AttributeDefinition
 *
 * @property {string} type
 * @property {boolean} writable
 * @property {boolean} [private] should the value be shown
 * @property {string} [depends] name of an attribute we depend on
 * @property {string[]} additionalAttributes extra attributes that are present in case our attribute is set
 * @property {string} description
 * @property {any} [default] the default value
 * @property {Function} [set] set the value
 * @property {Function} [get] get the value can be used to calculate default values
 * @property {string[]|string} [env] environment variable use to provide the value
 */

/**
 * Split property path into tokens
 * @generator
 * @param {string} string
 * @yields {string}
 */
export function* tokens(string) {
  let identifier = "";
  let last;

  for (const c of string) {
    switch (c) {
      case "\t":
      case " ":
        if (identifier.length) {
          yield identifier;
          identifier = "";
        }
        if (last) {
          yield last;
          last = undefined;
        }
        break;

      case "!":
      case ">":
      case "<":
        if (last) {
          yield last;
        }
        last = c;
        break;

      case "=":
        if (last) {
          yield last + c;
          last = undefined;
          break;
        }

      case "+":
      case "-":
      case ".":
      case "(":
      case ")":
      case "[":
      case "]":
        if (last) {
          yield last;
          last = undefined;
        }
        if (identifier.length) {
          yield identifier;
          identifier = "";
        }
        yield c;
        break;
      default:
        if (last) {
          yield last;
          last = undefined;
        }
        identifier += c;
    }
  }

  if (identifier.length) {
    yield identifier;
  }
  if (last) {
    yield last;
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
  if (object?.[name] !== undefined) {
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

/**
 * Deliver attribute value and operator.
 * The name may be a property path like 'a.b.c <='.
 * @param {Object} object
 * @param {string} expression
 * @returns {[any,string]} value associated with the given property name
 */
export function getAttributeAndOperator(object, expression, getters = {}) {
  let op = "=";

  for (const token of tokens(expression)) {
    switch (token) {
      case ">=":
      case "<=":
      case ">":
      case "<":
      case "=":
      case "!=":
        op = token;
        break;
      case ".":
      case "[":
      case "]":
        break;

      default:
        if (object === undefined) {
          break;
        }

        const g = getters[token];
        if (g) {
          object = g(object);
        } else {
          if (object[token] !== undefined) {
            object = object[token];
          }
        }
    }
  }

  return [object, op];
}
