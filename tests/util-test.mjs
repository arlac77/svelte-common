import test from "ava";
import { formatBytes, formatDuration } from "../src/util.mjs";

test("formatBytes", t => {
  t.is(formatBytes(0), "0 Bytes");
  t.is(formatBytes(1), "1 Byte");
  t.is(formatBytes(10), "10 Bytes");
});

test("formatDuration", t => {
  t.is(formatDuration(1), "1s");
  t.is(formatDuration(60), "1m");
  t.is(formatDuration(61), "1m 1s");
  t.is(formatDuration(3661), "1h 1m 1s");
});
