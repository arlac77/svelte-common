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
  let state, buffer;

  for (const c of string) {
    switch (state) {
      case "string-escaping":
        const esc = {
          "\\": "\\",
          t: "\t",
          b: "\b",
          r: "\r",
          n: "\n",
          f: "\f"
        };
        buffer += esc[c];
        state = "string";
        continue;
    }

    switch (c) {
      case "\t":
      case " ":
        switch (state) {
          case undefined:
            break;
          case "string":
            buffer += c;
            break;
          case "identifier":
            yield buffer;
            buffer = "";
            state = undefined;
            break;
          default:
            yield state;
            state = undefined;
        }
        break;

      case "\\":
        switch (state) {
          case "string":
            state = "string-escaping";
            break;
        }
        break;
      case '"':
      case "'":
        switch (state) {
          case undefined:
            buffer = "";
            state = "string";
            break;
          case "string":
            yield buffer;
            state = undefined;
            break;
          case "identifier":
            yield buffer;
            buffer = "";
            state = "string";
            break;
          default:
            yield state;
            buffer = "";
            state = "string";
        }
        break;
      case "!":
      case ">":
      case "<":
        switch (state) {
          case undefined:
            state = c;
            break;
          case "string":
            buffer += c;
            break;
          case "identifier":
            yield buffer;
            state = c;
            break;
          default:
            yield state;
            state = c;
        }
        break;

      case "=":
        switch (state) {
          case undefined:
            state = c;
            break;
          case "string":
            buffer += c;
            break;
          case "identifier":
            yield buffer;
            state = c;
            break;
          default:
            state += c;
        }
        break;
      case ".":
      case "+":
      case "-":
      case "*":
      case "/":
      case "(":
      case ")":
      case "[":
      case "]":
        switch (state) {
          case undefined:
            state = c;
            break;
          case "string":
            buffer += c;
            break;
          case "identifier":
            yield buffer;
            state = c;
            break;
          default:
            yield state;
            state = c;
        }
        break;
      default:
        switch (state) {
          case undefined:
            buffer = c;
            state = "identifier";
            break;
          case "string":
          case "identifier":
            buffer += c;
            break;
          default:
            if (
              (c >= "a" && c <= "z") ||
              (c >= "A" && c <= "Z") ||
              (c >= "0" && c <= "9") ||
              c === "_"
            ) {
              yield state;
              state = "identifier";
              buffer = c;
            } else {
              state += c;
            }
        }
    }
  }

  switch (state) {
    case undefined:
      break;
    case "string":
      throw new Error("unterminated string");
    case "identifier":
      yield buffer;
      break;
    default:
      yield state;
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

  if (lastKey) {
    lastObject[lastKey] = value;
  }
}

/**
 * Deliver attribute value.
 * The name may be a property path like 'a.b.c' or a[2]
 * @param {Object} object
 * @param {string} name
 * @returns {any} value associated with the given property name
 */
export function getAttribute(object, expression) {
  return getAttributeAndOperator(object, expression)[0];
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
  let predicateTokens;

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
        predicateTokens = [];
        break;
      case "]":
        // TODO: should loop over array actually getAttribute api should deliver iterators
        if (Array.isArray(object)) {
          object = object[0];
        }
        else {
          if(object[Symbol.iterator])
          object = [...object][0];
        }

        predicateTokens = undefined;
        break;
      case "*":
        predicateTokens.push(token);
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
          } else {
            return [undefined, op];
          }
        }
    }
  }

  return [object, op];
}
