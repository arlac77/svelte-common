import test from "ava";
import { toggleOrderBy, sorter } from "../src/sorting.mjs";

test("toggleOrderBy", t => {
  t.is(toggleOrderBy(), "none");
  t.is(toggleOrderBy("none"), "ascending");
  t.is(toggleOrderBy("ascending"), "descending");
  t.is(toggleOrderBy("descending"), "ascending");
});

test("sorter string", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: "a" }, { a: "b" }), -1);
  t.is(sort({ a: "a" }, { a: "a" }), 0);
  t.is(sort({ a: "b" }, { a: "a" }), 1);
});

test("sorter date", t => {
  const sort = sorter({ a: "ascending" });

  t.is(
    sort(
      { a: new Date("July 20, 69 20:17:40 GMT+00:00") },
      { a: new Date("July 20, 69 20:17:40 GMT+00:00") }
    ),
    0
  );

  t.is(
    sort(
      { a: new Date("July 20, 69 20:17:41 GMT+00:00") },
      { a: new Date("July 20, 69 20:17:40 GMT+00:00") }
    ),
    1
  );
  t.is(
    sort(
      { a: new Date("July 20, 69 20:17:40 GMT+00:00") },
      { a: new Date("July 20, 69 20:17:41 GMT+00:00") }
    ),
    -1
  );
});

test("sorter number", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: 77 }, { a: 77 }), 0);
  t.is(sort({ a: 78 }, { a: 77 }), 1);
  t.is(sort({ a: 77 }, { a: 78 }), -1);
});

test("sorter missing values", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({}, {}), -1);

  t.is(sort({ a: new Date(0) }, {}), 1);
  t.is(sort({ a: "a" }, {}), 1);
  t.is(sort({ a: 77 }, {}), 1);

  t.is(sort({ a: 77 }, { a: "a" }), -1);

  t.is(sort({ a: "a" }, { a: 77 }), 1);
  t.is(sort({}, { a: 77 }), -1);

  t.is(sort({}, { a: "a" }), -1);
});

test("sorter with getter", t => {
  const sort = sorter(
    { a: "ascending" },
    {
      a: object => object.a.b
    }
  );

  t.is(sort({ a: { b: "a" } }, { a: { b: "b" } }), -1);
  t.is(sort({ a: { b: "a" } }, { a: { b: "a" } }), 0);
  t.is(sort({ a: { b: "b" } }, { a: { b: "a" } }), 1);
});

test("sorter null", t => {
  t.falsy(sorter());
  t.falsy(sorter({}));
  t.falsy(sorter({ a: "none" }));
});
