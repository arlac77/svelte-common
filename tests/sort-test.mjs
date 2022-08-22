import test from "ava";
import { toggleOrderBy } from "../src/sorting.mjs";

test("toggleOrderBy", t => {
  t.is(toggleOrderBy(), "none");
  t.is(toggleOrderBy("none"), "ascending");
  t.is(toggleOrderBy("ascending"), "descending");
  t.is(toggleOrderBy("descending"), "none");
});
