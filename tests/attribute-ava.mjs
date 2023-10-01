import test from "ava";
import { tokens } from "../src/attribute.mjs";

function tt(t, input, expected) {
  t.deepEqual([...tokens(input)], expected);
}

tt.title = (providedTitle = "token", input) =>
  `${providedTitle} ${input}`.trim();

test(tt, " 'a'b\"c\" ", ["a", "b", "c"]);

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
