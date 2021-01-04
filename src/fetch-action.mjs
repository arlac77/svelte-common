import { Action } from "./action.mjs";

export class FetchAction extends Action {
  constructor(url, fetchOptions, options = {}) {
    const controller = new AbortController();
    super(
      async () => {
        try {
          const response = await fetch(
            typeof url === "function" ? url() : url,
            {
              signal: controller.signal,
              ...(typeof fetchOptions === "function"
                ? fetchOptions()
                : fetchOptions)
            }
          );

          if (!response.ok) {
            this.message = await handleFailedResponse(response);
            throw response;
          }

          if (options.responseHandler) {
            await options.responseHandler(response);
          }
        } catch (err) {
          if (err.name === "AbortError") {
          } else {
            throw err;
          }
        }
      },
      {
        ...options,
        cancel: () => controller.abort()
      }
    );
  }
}

/**
 * Extract error description from response
 * @param {FetchResponse} response
 * @return {string}
 */
export async function handleFailedResponse(response) {
  let message = response.statusText;

  if (response.headers) {
    const ct = response.headers.get("Content-Type").replace(/;.*/, "");

    switch (ct) {
      case "text/plain":
        message += "\n" + (await response.text());
        break;
      case "text/html":
        const root = document.createElement("html");
        root.innerHTML = await response.text();

        for (const tag of ["title", "h1", "h2"]) {
          for (const item of root.getElementsByTagName(tag)) {
            const text = item.innerText;
            if (text) {
              return text;
            }
          }
        }
        break;
    }
  }

  return message;
}
