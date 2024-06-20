import test from "ava";
import { toggleOrderBy, sorter } from "../src/sorting.mjs";

test("toggleOrderBy", t => {
  t.is(toggleOrderBy(), "none");
  t.is(toggleOrderBy("none"), "ascending");
  t.is(toggleOrderBy("ascending"), "descending");
  t.is(toggleOrderBy("descending"), "ascending");
});

test("sorter string ascending", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: "a" }, { a: "b" }), -1);
  t.is(sort({ a: "a" }, { a: "a" }), 0);
  t.is(sort({ a: "b" }, { a: "a" }), 1);
});

test("sorter string descending", t => {
  const sort = sorter({ a: "descending" });

  t.is(sort({ a: "a" }, { a: "b" }), 1);
  t.is(sort({ a: "a" }, { a: "a" }), 0);
  t.is(sort({ a: "b" }, { a: "a" }), -1);
});

test("sorter date ascending", t => {
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

test("sorter number ascending", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: 77 }, { a: 77 }), 0);
  t.is(sort({ a: 78 }, { a: 77 }), 1);
  t.is(sort({ a: 77 }, { a: 78 }), -1);
});

test("sorter big int ascending", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: 77n }, { a: 77n }), 0);
  t.is(sort({ a: 78n }, { a: 77n }), 1);
  t.is(sort({ a: 77n }, { a: 78n }), -1);
});

test("sorter number descending", t => {
  const sort = sorter({ a: "descending" });

  t.is(sort({ a: 77n }, { a: 77n }), 0);
  t.is(sort({ a: 78n }, { a: 77n }), -1);
  t.is(sort({ a: 77n }, { a: 78n }), 1);
});

test("sorter bigint ascending", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: 7700000000000n }, { a: 7700000000000n }), 0);
  t.is(sort({ a: 7800000000000n }, { a: 7700000000000n }), 1);
  t.is(sort({ a: 7700000000000n }, { a: 7800000000000n }), -1);
});

test("sorter bigint descending", t => {
  const sort = sorter({ a: "descending" });

  t.is(sort({ a: 7700000000000n }, { a: 7700000000000n }), 0);
  t.is(sort({ a: 7800000000000n }, { a: 7700000000000n }), -1);
  t.is(sort({ a: 7700000000000n }, { a: 7800000000000n }), 1);
});

test("sorter RegExp ascending", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: /a/ }, { a: /a/ }), 0);
  t.is(sort({ a: /b/ }, { a: /a/ }), 1);
  t.is(sort({ a: /a/ }, { a: /b/ }), -1);
});

test("sorter boolean ascending", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: true }, { a: true }), 0);
  t.is(sort({ a: false }, { a: false }), 0);
  t.is(sort({ a: true }, { a: false }), 1);
  t.is(sort({ a: false }, { a: true }), -1);
});

test("sorter missing values", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({}, {}), 0);

  t.is(sort({ a: "a" }, { a: 77 }), 1);
  t.is(sort({ a: 77 }, { a: "a" }), -1);

  t.is(sort({ a: 77 }, {}), 1);
  t.is(sort({}, { a: 77 }), -1);

  t.is(sort({ a: 77n }, {}), 1);
  t.is(sort({}, { a: 77n }), -1);

  t.is(sort({ a: "a" }, {}), 1);
  t.is(sort({}, { a: "a" }), -1);

  t.is(sort({ a: true }, {}), 1);
  t.is(sort({}, { a: true }), -1);

  t.is(sort({ a: new Date(0) }, {}), 1);
  t.is(sort({}, { a: new Date(0) }), -1);
});

test("sorter with property path", t => {
  const sort = sorter({ "a.b": "ascending" });

  t.is(sort({ a: { b: "a" } }, { a: { b: "b" } }), -1);
  t.is(sort({ a: { b: "a" } }, { a: { b: "a" } }), 0);
  t.is(sort({ a: { b: "b" } }, { a: { b: "a" } }), 1);
  t.is(sort({ a: { b: "b" } }, {}), 1);
});

test("sorter with property path simple array", t => {
  const sort = sorter({ "a[*].b": "ascending" });

  t.is(sort({ a: [{ b: "a" }] }, { a: [{ b: "b" }] }), -1);
  t.is(sort({ a: [{ b: "a" }] }, { a: [{ b: "a" }] }), 0);
  t.is(sort({ a: [{ b: "b" }] }, { a: [{ b: "a" }] }), 1);
  t.is(sort({ a: [{ b: "b" }] }, {}), 1);
});

test("sorter with getter", t => {
  const sort = sorter(
    { a: "ascending" },
    {
      a: object => object?.a?.b
    }
  );

  t.is(sort({ a: { b: "a" } }, { a: { b: "b" } }), -1);
  t.is(sort({ a: { b: "a" } }, { a: { b: "a" } }), 0);
  t.is(sort({ a: { b: "b" } }, { a: { b: "a" } }), 1);

  t.is(sort({ a: { b: "b" } }, {}), 1);
});

class FixPoint {
  value;
  constructor(value) {
    this.value = value;
  }

  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case "number":
        return this.value;

      default:
        return String(this.value);
    }
  }
}

test("sorter toPrimitive ascending", t => {
  const sort = sorter({ a: "ascending" });

  t.is(sort({ a: new FixPoint(77) }, { a: new FixPoint(77) }), 0);
  t.is(sort({ a: new FixPoint(78) }, { a: new FixPoint(77) }), 1);
  t.is(sort({ a: new FixPoint(77) }, { a: new FixPoint(78) }), -1);
});

test("sorter null", t => {
  t.falsy(sorter());
  t.falsy(sorter({}));
  t.falsy(sorter({ a: "none" }));
});
