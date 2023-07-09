import test from "ava";
import { writable } from "svelte/store";
import { Pagination, navigationItems } from "../src/pagination.mjs";

test("Pagination wizjout optionsr", t => {
  const pg = new Pagination([1, 2, 3, 4, 5]);
  t.is(pg.page, 1);
  t.is(pg.itemsPerPage, 20);
  t.is(pg.length, 20);
  t.is(pg.numberOfPages, 1);
  t.deepEqual([...pg], [1, 2, 3, 4, 5]);
});

test("Pagination set/get", t => {
  const pg = new Pagination([1, 2, 3, 4, 5], { itemsPerPage: 2 });

  t.is(pg.page, 1);
  t.is(pg.itemsPerPage, 2);
  t.is(pg.length, 2);
  t.is(pg.numberOfPages, 3);
  t.deepEqual([...pg], [1, 2]);
  let x;

  const unsubscribe = pg.subscribe(p => (x = p.page));

  t.is(x, 1);

  pg.page = 2;
  t.deepEqual([...pg], [3, 4]);

  t.is(x, 2);

  unsubscribe();

  pg.page = 1;

  t.is(x, 2);
});

test("Pagination set out of range", t => {
  const pg = new Pagination([1, 2, 3, 4], { itemsPerPage: 2 });

  pg.page = 0;
  t.is(pg.page, 1);

  pg.page = 77;
  t.is(pg.page, 1);
});

test("Pagination Array source", t => {
  const pg = new Pagination([1, 2, 3, 4], { itemsPerPage: 2 });
  t.is(pg.numberOfPages, 2);
  t.deepEqual([...pg], [1, 2]);
});

test("Pagination Map source", t => {
  const pg = new Pagination(
    new Map([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4]
    ]),
    { itemsPerPage: 2 }
  );
  t.is(pg.numberOfPages, 2);
  t.deepEqual([...pg], [1, 2]);
});

test("Pagination subscription source", t => {
  const source = {
    subscribe(s) {
      const data = new Map([
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4]
      ]);
      s(data);
      return () => {};
    }
  };
  const pg = new Pagination(source, { itemsPerPage: 2 });

  t.is(pg.numberOfPages, 2);
  t.deepEqual([...pg], [1, 2]);
});

function nit(t, np, cp, expected) {
  t.deepEqual([...navigationItems(np, cp)], expected);
}
nit.title = (providedTitle = "navigationItems", np, cp, expected) =>
  `${providedTitle} ${np} ${cp} [${expected}]`.trim();

test(nit, 1, 1, [1]);
test(nit, 10, 1, [1, 2, 9, 10]);
test(nit, 10, 5, [1, 2, 5, 9, 10]);
test(nit, 11, 1, [1, 2, 10, 11]);
