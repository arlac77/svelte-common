import test from "ava";
import { formatBytes } from "../src/util.mjs";

test("formatBytes", t => {
  t.is(formatBytes(0), "0 Bytes");
  t.is(formatBytes(1), "1 Byte");
  t.is(formatBytes(10), "10 Bytes");
});
