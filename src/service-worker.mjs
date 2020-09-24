import { readable } from "svelte/store";

/**
 * Create a store holding a service worker
 * @param {string} script The URL of the service worker script
 * @param {Object} options An object containing registration options
 * @return {Readable} store holding the service worker
 */
export function initializeServiceWorker(script, options) {
  const serviceWorker = readable({ state: "unknown" }, set => {
    navigator.serviceWorker
      .register(script, options)
      .then(serviceWorkerRegistration => {
        // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/update
        for (const state of ["active", "waiting", "installing"]) {
          const sw = serviceWorkerRegistration[state];
          if (sw) {
            set(sw);
            sw.onstatechange = event => set(sw);
            return;
          }
        }
      });

    return () => {};
  });

  return { serviceWorker };
}
