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
    if(seconds < 86400 && ! t) {
      out += 'T';
      t = true;
    }

    const n = Math.floor(seconds / d[0]);
    if (n > 0) {
      out += `${n}${d[1]}`;
      seconds -= n * d[0];
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
    const n = Math.floor(seconds / d[0]);
    if (n > 0) {
      out.push(`${n}${d[1]}`);
      seconds -= n * d[0];
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
