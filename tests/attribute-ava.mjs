import test from "ava";
import { tokens } from "../src/attribute.mjs";

function tt(t, input, expected) {
  t.deepEqual([...tokens(input)], expected);
}

tt.title = (providedTitle = "token", input) =>
  `${providedTitle} ${input}`.trim();

test(tt, "a< <= >= b>", ["a", "<", "<=", ">=", "b", ">"]);

test(tt, "a123 <= >= a = <> +-[]() b.c", [
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
  "c"
]);

test(tt, "a[*].b", ["a", "[", "*", "]", ".", "b"]);
