import test from "ava";
import { tokens } from "../src/attribute.mjs";

function tt(t, input, expected) {
  try {
    const result = [...tokens(input)];
    t.deepEqual(result, expected);
  } catch (e) {
    t.deepEqual(e, expected);
  }
}

tt.title = (providedTitle = "token", input, expected) =>
  `${providedTitle} ${input}${expected instanceof Error ? ' =>ERROR' : ''}`.trim();

test(tt, '"a', new Error("unterminated string"));

test(tt, " 'a'b\"c\" ", ["a", "b", "c"]);
test(tt, " 'a\\\\\\n\\r' ", ["a\\\n\r"]);

test(tt, "a< <= >= b>", ["a", "<", "<=", ">=", "b", ">"]);
test(tt, "a=", ["a", "="]);
test(tt, "a!=", ["a", "!="]);
test(tt, "a>=", ["a", ">="]);
test(tt, "a<=", ["a", "<="]);
test(tt, "a[2] .c", ["a", "[", "2", "]", ".", "c"]);
test(tt, "a123 <= >= a = <> +-[]() b.c 1234567890", [
  "a123",
  "<=",
  ">=",
  "a",
  "=",
  "<",
  ">",
  "+",
  "-",
  "[",
  "]",
  "(",
  ")",
  "b",
  ".",
  "c",
  "1234567890"
]);

test(tt, "a[*]._b", ["a", "[", "*", "]", ".", "_b"]);
