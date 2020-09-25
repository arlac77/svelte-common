import { readable } from "svelte/store";

/**
 * Create a store holding a service worker
 * @param {string} script The URL of the service worker script
 * @param {Object} options An object containing registration options
 * @return {Object} store holding the service worker
 */
export function initializeServiceWorker(script, options) {
  let setServiceWorkerRegistration;
  let serviceWorkerRegistration;

  const serviceWorkerRegistrationReadable = readable(
    { scope: "unknown" },
    set => {
      setServiceWorkerRegistration = set;
      if (serviceWorkerRegistration) {
        set(serviceWorkerRegistration);
      }
      return () => {};
    }
  );

  const serviceWorker = readable({ state: "unknown" }, set => {
    navigator.serviceWorker.register(script, options).then(swr => {
      serviceWorkerRegistration = swr;
      if (setServiceWorkerRegistration) {
        setServiceWorkerRegistration(serviceWorkerRegistration);
      }
      console.log(
        "navigationPreload",
        serviceWorkerRegistration.navigationPreload
      );
      console.log("index", serviceWorkerRegistration.index);
      if (serviceWorkerRegistration.navigationPreload) {
        serviceWorkerRegistration.navigationPreload.getState().then(state => {
          console.log("navigationPreload state", state);
        });
      }

      if (serviceWorkerRegistration.index) {
        serviceWorkerRegistration.index.getAll().then(all => {
          console.log(all);
        });
      }

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

  return {
    serviceWorker,
    serviceWorkerRegistration: serviceWorkerRegistrationReadable
  };
}
