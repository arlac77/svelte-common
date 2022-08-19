import test from "ava";
import { toggleOrdeBy } from "../src/sorting.mjs";

test("toggleOrdeBy", t => {
  t.is(toggleOrdeBy(), "none");
  t.is(toggleOrdeBy("none"), "ascending");
  t.is(toggleOrdeBy("ascending"), "descending");
  t.is(toggleOrdeBy("descending"), "none");
});
