import test from "ava";
import { Action } from "../src/action.mjs";

test("Action resolve", async t => {
  const action = new Action(() => Promise.resolve());

  t.false(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.false(action.completed);
  t.false(action.disabled);

  const p = action.start();
  t.true(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.false(action.completed);

  await p;

  t.false(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.true(action.completed);
});

test("Action disabled", async t => {
  const action = new Action(() => Promise.resolve());

  let sDisabled = 77;

  const endSubscription = action.subscribe(a => {
    sDisabled = a.disabled;
  });

  action.disabled = true;

  t.is(sDisabled, true);

  t.false(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.false(action.completed);
  t.true(action.disabled);

  action.start();

  t.false(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.false(action.completed);

  endSubscription();
});

test("Action reject", async t => {
  const action = new Action(() => Promise.reject(0));

  t.false(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.false(action.completed);
  t.false(action.disabled);

  const p = action.start();

  t.true(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.false(action.completed);

  await p;

  t.false(action.active);
  t.true(action.failed);
  t.false(action.canceled);
  t.false(action.completed);
});
