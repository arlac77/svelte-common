import test from "ava";
import { writable } from "svelte/store";
import { keyPrefixStore } from "../src/util.mjs";

test("keyPrefixStore set/get", t => {
  let wso, kpso;

  const ws = writable({ "sort:a": "1" });
  ws.subscribe(s => (wso = s));

  const kps = keyPrefixStore(ws, "sort:");
  let subscription = kps.subscribe(s => (kpso = s));

  t.deepEqual(wso, { "sort:a": "1" });
  t.deepEqual(kpso, { a: "1" });

  kps.set({ a: "2" });

  t.deepEqual(wso, { "sort:a": "2" });
  t.deepEqual(kpso, { a: "2" });

  ws.set({ "sort:a": "3", "filter:b": 4 });

  t.deepEqual(wso, { "sort:a": "3", "filter:b": 4 });

  t.deepEqual(kpso, { a: "3" });


  subscription();
  ws.set({ "sort:a": "4" });
  t.deepEqual(kpso, { a: "3" });
});

test("keyPrefixStore initial empty", t => {
  let kpso;

  const kps = keyPrefixStore(writable(), "sort:");
  kps.subscribe(s => (kpso = s));
  t.deepEqual(kpso, {});
});
