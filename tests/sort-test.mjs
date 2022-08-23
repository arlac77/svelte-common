import test from "ava";
import { toggleOrderBy, sorter } from "../src/sorting.mjs";

test("toggleOrderBy", t => {
  t.is(toggleOrderBy(), "none");
  t.is(toggleOrderBy("none"), "ascending");
  t.is(toggleOrderBy("ascending"), "descending");
  t.is(toggleOrderBy("descending"), "none");
});

test("sorter", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: "a" }, { a: "b" }), -1);
  t.is(sort({ a: "a" }, { a: "a" }), 0);
  t.is(sort({ a: "b" }, { a: "a" }), 1);
});

test("sorter null", t => {
  t.falsy(sorter());
  t.falsy(sorter({ }));
  t.falsy(sorter({ a: "none"}));
});
