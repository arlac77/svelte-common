import test from "ava";
import { writable } from "svelte/store";
import { keyPrefixStore } from "../src/util.mjs";

test("keyPrefixStore set/get", t => {
  let wso, kpso, kpfo;

  const ws = writable({ "sort:a": "1" });
  ws.subscribe(s => (wso = s));

  const sps = keyPrefixStore(ws, "sort:");
  const unsubscribeKps = sps.subscribe(s => (kpso = s));

  t.deepEqual(wso, { "sort:a": "1" });
  t.deepEqual(kpso, { a: "1" });

  sps.set({ a: "2" });

  t.deepEqual(wso, { "sort:a": "2" });
  t.deepEqual(kpso, { a: "2" });

  ws.set({ "sort:a": "3", "filter:b": 4 });

  t.deepEqual(wso, { "sort:a": "3", "filter:b": 4 });

  t.deepEqual(kpso, { a: "3" });

  sps.set({ a: "4" });
  t.deepEqual(wso, { "sort:a": "4", "filter:b": 4 });

  const fps = keyPrefixStore(ws, "filter:");
  const unsubscribeFps = fps.subscribe(s => (kpfo = s));
  t.deepEqual(kpfo, { b: 4 });

  unsubscribeFps();
  t.deepEqual(kpfo, { b: 4 });

  unsubscribeKps();
  ws.set({ "sort:a": "5" });
  t.deepEqual(kpso, { a: "4" });
});

test("keyPrefixStore serveral on one base", t => {
  let wso;

  const ws = writable({ x: "1" });
  ws.subscribe(s => (wso = s));
  t.deepEqual(wso, { x: "1" });

  const sps = keyPrefixStore(ws, "sort:");
  const fps = keyPrefixStore(ws, "filter:");
  t.deepEqual(wso, { x: "1" });

  sps.set({ a: "2" });
  t.deepEqual(wso, { x: "1", "sort:a": "2" });

  fps.set({ a: "2" });
  t.deepEqual(wso, { x: "1", "sort:a": "2", "filter:a": "2" });

  sps.set({ b: "3" });
  t.deepEqual(wso, { x: "1", "sort:b": "3", "filter:a": "2" });
});

test("keyPrefixStore initial empty", t => {
  let kpso;

  const kps = keyPrefixStore(writable(), "sort:");
  kps.subscribe(s => (kpso = s));
  t.deepEqual(kpso, {});
});

test("keyPrefixStore initial values", t => {
  let kpso;

  const kps = keyPrefixStore(writable({ "sort:a": 1, "other" : 2}), "sort:");
  kps.subscribe(s => (kpso = s));
  t.deepEqual(kpso, { a: 1 });
});
