import test from "ava";
import { filter } from "../src/filter.mjs";

class FixPoint {
  value;
  constructor(value) {
    this.value = value;
  }

  toString() {
    return String(this.value);
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

test("filter string", t => {
  const f = filter({ a: "a" });
  t.falsy(f({ b: "abc" }));
});

test("filter combine by and", t => {
  const f = filter({ a: "a", b: "b" });

  t.truthy(f({ a: "abc", b: "abc" }));
  t.falsy(f({ a: "abc", b: "x" }));
  t.falsy(f({ a: "x", b: "abc" }));

  t.falsy(f({ a: "x" }));
  t.falsy(f({ b: "abc" }));
  t.falsy(f({}));
  t.falsy(f());
});

test("filter with getter", t => {
  const f = filter(
    { a: { b: "a" } },
    {
      a: object => object?.a?.b
    }
  );

  t.truthy(f({ a: { b: "abc" } }));
  t.falsy(f({ a: "x" }));
  t.falsy(f({ b: "abc" }));
});

test("filter property path", t => {
  const f = filter({ "a.b.c": 1 });
  t.truthy(f({ a: { b: { c: 1 } } }));
  t.falsy(f({ a: { b: 0 } }));
});

test("filter property path [] positive", t => {
  const f = filter({ "a[2] .c": 1 });
  t.truthy(f({ a: [0, 1, { c: 1 }] }));
});

test("filter property path [] negative", t => {
  const f = filter({ "a[2] .c": 1 });
  t.falsy(f({ a: [0, 1] }));
});

test("filter property path [*] positive", t => {
  const f = filter({ "a[*].c": 1 });
  t.truthy(f({ a: [{ c: 1 }, 1, 2] }));
});

function ft(t, fv, pv, expected) {
  const object = { a: pv };
  const f = filter({ a: fv });
  if (expected) {
    t.truthy(f(object));
  } else {
    t.falsy(f(object));
  }

  t.falsy(f({}), "empty");
  t.falsy(f(), "undefined");
}
ft.title = (providedTitle = "filter", fv, pv, expected) =>
  `${providedTitle} ${fv} ${
    typeof pv === "string" ? '"' + pv + '"' : pv
  } ${expected}`.trim();

test(ft, /a/, "abc", true);
test(ft, /a/, /a/, true);
test(ft, /a/, undefined, false);
test(ft, /a/, "", false);
test(ft, /a/, "b", false);
test(ft, "a", "abc", true);
test(ft, "a", /a/, true);
test(ft, "a", "b", false);
test(ft, "a", 1, false);
test(ft, "a", undefined, false);
test(ft, "", "a", true); // empty string matches
test(ft, "", "1", true); // empty string matches
test(ft, "", "", true); // empty string matches

test(ft, 1, 1, true);
test(ft, 1, /1/, true);
test(ft, 1.234, 1.234, true);
test(ft, /1/, 1, true);
test(ft, /1/, 1.234, true);
test(ft, 1, 2, false);
test(ft, /1/, 2, false);
test(ft, 2, "2", true);
test(ft, /2/, "2", true);
test(ft, "3", 3, true);
test(ft, 4n, 4n, true);
test(ft, /4/, 4n, true);
test(ft, 4n, 5n, false);
test(ft, /4/, 5n, false);
test(ft, 6n, 6, true);
test(ft, 7, 7n, true);
test(ft, 8, undefined, false);
test(ft, 8.1, "", true); // empty string matches

test(ft, new FixPoint(9), undefined, false);
test(ft, new FixPoint(10), 10, true);
test(ft, new FixPoint(11), 11n, true);
test(ft, new FixPoint(12), new FixPoint(12), true);
test(ft, new FixPoint(13), new FixPoint(12), false);
test(ft, new FixPoint(14), "14", true);
test(ft, 15, new FixPoint(15), true);
test(ft, "16", new FixPoint(16), true);
test(ft, 17n, new FixPoint(17), true);

test(ft, new Date(0), "xyz", false);
test(ft, new Date(0), "", false);
test(ft, new Date(0), 0, false);
test(ft, new Date(0), true, false);
test(ft, new Date(0), undefined, false);
test(ft, 47, new Date(0), false);
test(ft, false, new Date(0), false);
test(ft, /1970/, new Date(6 * 3600 * 1000), true);
test(ft, "1970", new Date(0), true);

test(ft, [new Date(0), new Date(2000)], new Date(1000), true);
test(ft, [new Date(1500), new Date(2000)], new Date(1000), false);

test(ft, new Date(0), new Date(0), true);

test(ft, 1, [], false);
test(ft, 1, [1, 2, 3], true);
test(ft, 2n, [], false);
test(ft, 2n, [1, 2, 3], true);
test(ft, "a", [], false);
test(ft, "a", ["a", "b", "c"], true);
test(ft, false, [], false);
test(ft, false, [false, false], true);
test(ft, true, [], false);
test(ft, true, [true, true], true);

test(ft, 1, new Set(), false);
test(ft, 2n, new Set(), false);
test(ft, 2, new Set([1, 2, 3]), true);
test(ft, "a", new Set(), false);
test(ft, "a", new Set(["a", "b", "c"]), true);

test(
  ft,
  new Map([
    [1, "a"],
    [2, "b"],
    [3, "c"]
  ]),
  2,
  true
);

test(
  ft,
  new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
  ]),
  "a",
  true
);

test(ft, new Set([1, 2, 3]), 2, true);
test(ft, new Set([1, 2, 3]), "3", true);
test(ft, new Set([1, 2, 3]), 4, false);
test(ft, new Set([1, 2, 3]), "5", false);
test(ft, new Set([true]), true, true);
test(ft, new Set([false]), false, true);
test(ft, new Set([false]), true, false);
test(ft, [1, 2, 3], 2, true);
test(ft, [1, 2, 3], "3", true);
test(ft, [1, 2, 3], 4, false);
test(ft, [1, 2, 3], "5", false);
test(ft, [true, false], true, true);
test(ft, [true, false], false, true);
test(ft, new Set(["a", "b", "c"]), "b", true);
test(ft, new Set(["a", "b", "c"]), "d", false);
test(ft, ["a", "b", "c"], "b", true);
test(ft, ["a", "b", "c"], "d", false);

test(ft, 1, new Map(), false);
test(ft, 2n, new Map(), false);
test(ft, "a", new Map(), false);
test(ft, ["b"], new Map(), false);
test(ft, new Set("a"), new Map(), false);
test(ft, new Map([["b", 1]]), new Map(), false);

test(
  ft,
  2,
  new Map([
    [1, 11],
    [2, 22]
  ]),
  true
);
test(
  ft,
  "a",
  new Map([
    ["a", 11],
    ["b", 22]
  ]),
  true
);

test.skip(
  ft,
  "b",
  new Map([
    [1, "b"],
    [2, "b"]
  ]),
  true
);

test(ft, true, true, true);
test(ft, true, {}, true);
test(ft, true, new Date(), true);
test(ft, true, "a", true);
test(ft, true, "", false);
test(ft, true, false, false);
test(ft, true, undefined, false);
test(ft, true, null, false);

test(ft, false, false, true);
test(ft, false, true, false);
test(ft, false, undefined, false);
test(ft, false, null, false);
test(ft, false, "", true);

test(ft, fetch, fetch, false);
test(ft, true, fetch, false);
test(ft, fetch, true, false);
test(ft, false, fetch, false);
test(ft, fetch, false, false);

test(ft, undefined, undefined, false);
test(ft, undefined, null, false);
test(ft, null, undefined, false);
test(ft, null, null, false);

function fopt(t, l, h) {
  const key = "key";

  t.truthy(filter({ [key]: l })({ [key]: l }), `${l} ${l}`);
  t.truthy(filter({ [key + "="]: l })({ [key]: l }), `${l} = ${l}`);
  t.falsy(filter({ [key + "!="]: l })({ [key]: l }), `${l} != ${l}`);

  t.truthy(filter({ [key + ">"]: l })({ [key]: h }), `${l} > ${h}`);
  t.truthy(filter({ [key + ">="]: l })({ [key]: h }), `${l} >= ${h}`);
  t.truthy(filter({ [key + ">="]: l })({ [key]: l }), `${l} >= ${l}`);

  t.truthy(filter({ [key + "<"]: h })({ [key]: l }), `${h} < ${l}`);
  t.truthy(filter({ [key + "<="]: h })({ [key]: l }), `${h} <= ${l}`);
  t.truthy(filter({ [key + "<="]: l })({ [key]: l }), `${l} <= ${l}`);
}

fopt.title = (providedTitle = "filter op", l, h) =>
  `${providedTitle} ${l}<=${l} ${l}<=${h} ${l}<${h} ${l}=${l} ${h}>${l} ${h}>=${l} ${l}>=${l}`.trim();

test(fopt, new Date("1995-12-15T03:24:00"), new Date("1995-12-16T03:24:00"));
test(fopt, "1995-12-15T03:24:00", new Date("1995-12-16T03:24:00"));
test(fopt, new Date("1995-12-15T03:24:00"), "1995-12-16T03:24:00");

test(fopt, 1, 2);
test(fopt, 3, 4n);
test(fopt, 5n, 6);
test(fopt, "7", 8);
test(fopt, "-7", 8);
test(fopt, 9, "10");
test(fopt, 11n, "12");
test(fopt, "13", 14n);
test(fopt, "-13", 14n);
test(fopt, new FixPoint(15), new FixPoint(16));
