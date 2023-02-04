import test from "ava";
import { filter } from "../src/filter.mjs";

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

test("filter property path []", t => {
  const f = filter({ "a[2] .c": 1 });
  t.truthy(f({ a: [0, 1, { c: 1 }] }));
  t.falsy(f({ a: [0, 1] }));
});

function ft(t, fv, pv, expected) {
  const f = filter({ a: fv });
  if (expected) {
    t.truthy(f({ a: pv }));
  } else {
    t.falsy(f({ a: pv }));
  }

  t.falsy(f({}));
  t.falsy(f());
}
ft.title = (providedTitle = "filter", fv, pv, expected) =>
  `${providedTitle} ${fv} ${pv} ${expected}`.trim();

test(ft, /a/, "abc", true);
test(ft, /a/, "b", false);
test(ft, "a", "abc", true);
test(ft, "a", "b", false);
test(ft, "a", 1, false);
test(ft, 1, 1, true);
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

test(ft, new Date(0), "xyz", false);
test(ft, new Date(0), 0, false);
test(ft, new Date(0), true, false);
test(ft, 47, new Date(0), false);
test(ft, false, new Date(0), false);
test(ft, /1970/, new Date(0), true);
test(ft, "1970", new Date(0), true);
test(ft, new Date(0), new Date(0), true);

test(ft, true, true, true);
test(ft, false, false, true);
test(ft, false, true, false);

function fopt(t, l, m) {
  let key = "key";

  t.truthy(filter({ [key]: l })({ [key]: l }), `${l} ${l}`);
  t.truthy(filter({ [key + "="]: l })({ [key]: l }), `${l} = ${l}`);
  t.truthy(filter({ [key + "<"]: m })({ [key]: l }), `${m} < ${l}`);
  t.truthy(filter({ [key + ">"]: l })({ [key]: m }), `${l} > ${m}`);
}

fopt.title = (providedTitle = "filter op", l, m) =>
  `${providedTitle} ${l}<${m} ${l}=${l} ${m}>${l}`.trim();

test(fopt, new Date("1995-12-15T03:24:00"), new Date("1995-12-16T03:24:00"));
test(fopt, "1995-12-15T03:24:00", new Date("1995-12-16T03:24:00"));
test(fopt, new Date("1995-12-15T03:24:00"), "1995-12-16T03:24:00");

test(fopt, 1, 2);
test(fopt, 3, 4n);
test(fopt, 5n, 6);
test(fopt, "7", 8);
test(fopt, 9, "10");
test(fopt, 11n, "12");
test(fopt, "13", 14n);
