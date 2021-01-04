export class Action {
  constructor(createPromise, cancelPromise = () => {}) {
    this.createPromise = createPromise;
    this.cancelPromise = cancelPromise;
    this.failed = false;
    this.completed = false;
    this.canceled = false;

    let disabled = false;
    Object.defineProperties(this, {
      subscriptions: { value: new Set() },
      disabled: {
        get: () => disabled,
        set: value => {
          disabled = value;
          this.emit();
        }
      }
    });
  }

  /**
   * @param {Function} subscription
   */
  subscribe(subscription) {
    subscription(this);
    this.subscriptions.add(subscription);
    return () => this.subscriptions.delete(subscription);
  }

  emit() {
    this.subscriptions.forEach(subscription => subscription(this));
  }

  async start() {
    if (this.active || this.disabled) {
      return;
    }

    this.timer = setTimeout(() => this.cancel(), this.timeout);
    this.promise = this.createPromise();

    this.disabled = true;

    try {
      await this.promise;
      this.completed = true;
    } catch (e) {
      this.error = e;
      this.failed = true;
    } finally {
      delete this.promise;
      this.disabled = false;
    }
  }

  async cancel() {
    this.canceled = true;

    if (this.timer) {
      clearTimeout(this.timer);
      delete this.timer;
    }

    await this.cancelPromise();
    delete this.promise;
    this.emit();
  }

  get timeout() {
    return 1000 * 30;
  }

  get active() {
    return this.promise ? true : false;
  }
}
