import test from "ava";
import { filter } from "../src/filter.mjs";

test("filter string", t => {
  const f = filter({ a: "a" });
  t.falsy(f({ b: "abc" }));
});

test("filter and ", t => {
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

ft.title = (providedTitle = "", fv, pv, expected) =>
  `${providedTitle} ${JSON.stringify(fv)} ${JSON.stringify(
    pv
  )} ${expected}`.trim();

test(ft, /a/, "abc", true);
test(ft, /a/, "b", false);
test(ft, "a", "abc", true);
test(ft, "a", "b", false);
test(ft, "a", 1, false);
test(ft, 1, 1, true);
test(ft, 1, 2, false);
test(ft, 1, "1", true);
test(ft, "1", 1, true);

test(ft, new Date(0), "xyz", false);
test(ft, new Date(0), 0, false);
test(ft, new Date(0), true, false);
test(ft, 47, new Date(0), false);
test(ft, false, new Date(0), false);

/*
test(ft, new Date(0), "1970-01-01T00:00:00.000Z", true);
test(ft, "1970-01-01T00:00:1.000Z", new Date(1000), true);
*/

test(ft, true, true, true);
test(ft, false, false, true);
test(ft, false, true, false);
