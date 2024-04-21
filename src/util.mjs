import { writable } from "svelte/store";

export const dateFormatter = new Intl.DateTimeFormat("default", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour12: false,
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit"
});

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  if (bytes === 1) return "1 Byte";

  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + byteSizes[i]
  );
}

const byteSizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

const durationsISO = [
  [86400, "D"],
  [3600, "H"],
  [60, "M"],
  [1, "S"]
];

export function formatDurationISO(seconds) {
  let out = "P";
  let t = false;

  for (const d of durationsISO) {
    if (seconds < 86400 && !t) {
      out += "T";
      t = true;
    }

    const n = Math.floor(seconds / Number(d[0]));
    if (n > 0) {
      out += `${n}${d[1]}`;
      seconds -= n * Number(d[0]);
    }
  }

  return out;
}

const durations = [
  [604800, "w"],
  [86400, "d"],
  [3600, "h"],
  [60, "m"],
  [1, "s"]
];

export function formatDuration(seconds) {
  const out = [];
  for (const d of durations) {
    const n = Math.floor(seconds / Number(d[0]));
    if (n > 0) {
      out.push(`${n}${d[1]}`);
      seconds -= n * Number(d[0]);
    }
  }

  return out.join(" ");
}

export function formatSecondsSinceEpoch(sse) {
  if (sse === undefined) {
    return "-";
  }
  return dateFormatter.format(new Date(sse));
}

/*
import { readable } from 'svelte/store';


function liveDuration(seconds) {
  const time = readable(new Date(), set => {
    const interval = setInterval(() => {
      set(seconds);
    }, 1000);
  
    return () => clearInterval(interval);
  });

  return time;
}

*/

/**
 * Create a derived store where all the object keys are prefixed.
 * ```
 * { a: 1, b: 2 } -> { foo_a: 1 foo_b: 2 } // prefix: foo_
 * ```
 * @param {writable} store we derive from
 * @param {string} prefix for each key
 * @returns {writable}
 */
export function keyPrefixStore(store, prefix) {
  const subscriptions = new Set();

  let forwardSubscription;
  let forwardObject;

  function subscribeMyself() {
    if (!forwardSubscription) {
      forwardSubscription = store.subscribe(o => {
        forwardObject = o;
        const object =
          forwardObject === undefined
            ? {}
            : Object.fromEntries(
                Object.entries(forwardObject)
                  .filter(([k, v]) => k.startsWith(prefix))
                  .map(([k, v]) => [k.substring(prefix.length), v])
              );

        subscriptions.forEach(subscription => subscription(object));
      });
    }
  }

  return {
    set: object => {
      subscribeMyself();

      for(const [k,v] of Object.entries(forwardObject)) {
        if(k.startsWith(prefix)) {
          delete forwardObject[k];
        }
      }

      store.set(
        Object.assign(
          forwardObject,
          Object.fromEntries(
            Object.entries(object)
              .map(([k, v]) => [prefix + k, v])
          )
        )
      );
    },

    subscribe: s => {
      subscriptions.add(s);

      subscribeMyself();

      return () => {
        subscriptions.delete(s);
        if (subscriptions.size === 0) {
          forwardSubscription();
          forwardSubscription = undefined;
        }
      };
    }
  };
}
