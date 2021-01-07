import test from "ava";
import { FetchAction } from "../src/fetch-action.mjs";

globalThis.AbortController = class AbortController {};
globalThis.fetch = async function (url, options) {
  return {
    url,
    get statusText() {
      return url.indexOf("ok") >= 0 ? "ok" : "error";
    },
    get ok() {
      return url.indexOf("ok") >= 0;
    }
  };
};

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

test("FetchAction exec ok", async t => {
  const action = new FetchAction("https://mydomain.com/ok", {}, {});

  const p = action.start();

  t.true(action.active);

  await p;

  t.false(action.active);
  t.false(action.failed);
  t.falsy(action.error);
});

test("FetchAction exec failed", async t => {
  const action = new FetchAction("https://mydomain.com/bad", {}, {});

  const p = action.start();

  t.true(action.active);

  await p;

  t.false(action.active);
  t.true(action.failed);
  t.truthy(action.error);
});
