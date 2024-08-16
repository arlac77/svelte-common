import test from "ava";
import { Pagination, navigationItems } from "../src/pagination.mjs";

test("Pagination without options", t => {
  const pg = new Pagination([1, 2, 3, 4, 5]);
  t.is(pg.page, 1);
  t.is(pg.itemsPerPage, 20);
  t.is(pg.length, 20);
  t.is(pg.numberOfPages, 1);
  t.deepEqual([...pg], [1, 2, 3, 4, 5]);
  t.deepEqual([...pg.filteredItems], [1, 2, 3, 4, 5]);
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

  pg.page = -5;
  t.is(pg.page, 1);

  pg.page = 0;
  t.is(pg.page, 1);

  pg.page = 77;
  t.is(pg.page, 2);
});

test("Pagination move page into range", t => {
  const pg = new Pagination([1, 2, 3, 4], { itemsPerPage: 2 });

  pg.page = 2;
  t.is(pg.page, 2);

  pg.data = [1, 2];
  t.is(pg.page, 1);

  pg.data = [1, 2, 3, 4];
  pg.page = 2;
  pg.filter = x => x < 2;
  t.is(pg.page, 1);
});

test("Pagination set negative", t => {
  const pg = new Pagination([1, 2, 3, 4], { itemsPerPage: 2 });

  pg.page = -1;
  t.is(pg.page, 2);

  pg.page = -2;
  t.is(pg.page, 1);
});

test("Pagination Array source", t => {
  const pg = new Pagination([1, 2, 3, 4], { itemsPerPage: 2 });
  t.is(pg.numberOfPages, 2);
  t.deepEqual([...pg], [1, 2]);
});

test("Pagination Array source filter", t => {
  const pg = new Pagination([1, 2, 3, 4], {
    itemsPerPage: 2,
    filter: i => i >= 3
  });
  let x;

  t.is(pg.numberOfItems, 2);
  t.is(pg.numberOfPages, 1);
  t.deepEqual([...pg], [3, 4]);

  pg.filter = undefined;

  const unsubscribe = pg.subscribe(p => (x = p.numberOfPages));
  t.is(x, 2);

  t.is(pg.numberOfPages, 2);

  unsubscribe();
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
  t.is(pg.numberOfItems, 4);
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

  t.is(pg.numberOfItems, 4);
  t.is(pg.numberOfPages, 2);
  t.deepEqual([...pg], [1, 2]);
});

function nit(t, np, cp, expected) {
  t.deepEqual([...navigationItems(np, cp)], expected);
}
nit.title = (providedTitle = "navigationItems", np, cp, expected) =>
  `${providedTitle} ${np} ${cp} [${expected}]`.trim();

test(nit, 0, 0, []);
test(nit, 1, 1, [1]);
test(nit, 2, 1, [1, 2]);
test(nit, 3, 1, [1, 2, 3]);
test(nit, 4, 2, [1, 2, 3, 4]);
test(nit, 5, 2, [1, 2, 4, 5]);
test(nit, 6, 3, [1, 2, 3, 5, 6]);
test(nit, 7, 3, [1, 2, 3, 6, 7]);
test(nit, 8, 3, [1, 2, 3, 7, 8]);
test(nit, 10, 5, [1, 2, 5, 9, 10]);
test(nit, 11, 1, [1, 2, 10, 11]);
test(nit, 100, 1, [1, 2, 10, 20, 30, 40, 50, 60, 70, 80, 90, 99, 100]);
test(
  nit,
  1000,
  1,
  [1, 2, 100, 200, 300, 400, 500, 600, 700, 800, 900, 999, 1000]
);
test(
  nit,
  10000,
  4511,
  [
    1, 2, 1000, 2000, 3000, 4000, 4511, 5000, 6000, 7000, 8000, 9000, 9999,
    10000
  ]
);
