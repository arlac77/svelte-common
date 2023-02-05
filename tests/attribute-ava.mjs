import test from "ava";
import { tokens } from "../src/attribute.mjs";

function tt(t, input, expected) {
  const result = [];
  for(const i of tokens(input)) {
  	result.push(i);
  }
  
  t.deepEqual(result,expected);
}
tt.title = (providedTitle = "token",input) =>
  `${providedTitle} ${input}`.trim();

test(tt, "a123 <> b.c", ["a123", "<", ">", "b", ".", "c"]);
