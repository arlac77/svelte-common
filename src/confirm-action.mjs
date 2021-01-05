import { BasicAction } from "./action.mjs";

/**
 *
 */
export class ConfirmAction extends BasicAction {
  constructor(action) {
    super(
      () =>
        new Promise((resolve, reject) => {
          if (confirm(`Really ${action.title}?`)) {
            resolve();
            action.start();
          } else {
            reject();
          }
        }),
      {
        action: { value: action }
      }
    );
  }

  subscribe(subscription) {
    return this.action.subscribe(subscription);
  }

  get disabled() {
    return this.action.disabled;
  }

  get shortcuts() {
    return this.action.shortcuts;
  }

  get title() {
    return this.action.title;
  }

  get description() {
    return this.action.description;
  }

  get active() {
    return this.action.active;
  }

  get failed() {
    return this.action.failed;
  }

  get canceled() {
    return this.action.canceled;
  }

  get completed() {
    return this.action.completed;
  }
}
