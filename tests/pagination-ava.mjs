import test from "ava";
import { writable } from "svelte/store";
import { Pagination } from "../src/pagination.mjs";

test("Pagination set/get", t => {
  const pg = new Pagination([1, 2, 3, 4], 2);

  t.is(pg.page, 1);
  t.is(pg.numberOfPages, 2);
  t.deepEqual([...pg.items()], [1, 2]);
  let x;

  const unsubscribe = pg.subscribe(p => (x = p.page));

  t.is(x, 1);

  pg.page = 2;
  t.deepEqual([...pg.items()], [3, 4]);

  t.is(x, 2);

  unsubscribe();

  pg.page = 1;

  t.is(x, 2);
});


test("Pagination set out of range", t => {
  const pg = new Pagination([1, 2, 3, 4], 2);

  pg.page = 0;
  t.is(pg.page, 1);

  pg.page = 77;
  t.is(pg.page, 1);
});
