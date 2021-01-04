import test from "ava";
import { FetchAction } from "../src/fetch-action.mjs";

test("FetchAction", async t => {
  const action = new FetchAction(
    "https://github.com/",
    {},
    { disabled: true, title: "hallo" }
  );

  t.is(action.title, "hallo");
  t.false(action.active);
  t.false(action.failed);
  t.false(action.canceled);
  t.false(action.completed);
  t.true(action.disabled);
});
