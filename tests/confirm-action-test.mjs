import test from "ava";
import { Action } from "../src/action.mjs";
import { ConfirmAction } from "../src/confirm-action.mjs";

globalThis.confirm = async function (message) {
  return message.match(/ok/) ? true : false;
};

test("ConfirmAction", async t => {
  const action = new ConfirmAction(
    new Action(() => Promise.resolve(77), {
      timeout: 1000,
      title: "hello",
      description: "Say hello",
      shortcuts: "Command+A"
    })
  );

  t.is(action.timeout, 30000);
  t.is(action.title, "hello");
  t.is(action.description, "Say hello");
  t.is(action.shortcuts, "Command+A");
  t.false(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.false(action.completed);
  t.false(action.disabled);

  const p = action.start();

  t.true(action.active);

  await p;

  // t.is(action.action.promise,7);
});
