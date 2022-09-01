import test from "ava";
import { writable } from "svelte/store";
import { keyPrefixStore } from "../src/util.mjs";

test("keyPrefixStore set/get", t => {
  let wso, kpso;

  const ws = writable({ a: "1" });
  ws.subscribe(s => (wso = s));

  const kps = keyPrefixStore(ws, "sort.");

  kps.subscribe(s => (kpso = s));

  kps.set({ a: "2" });

  t.deepEqual(wso, { "sort.a": "2" });

  ws.set({ "sort.a": "3" });

  t.deepEqual(kpso, { a: "3" });
});
