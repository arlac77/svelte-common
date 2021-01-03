export class Action {
  constructor(createPromise, cancelPromise = () => {}) {
    this.createPromise = createPromise;
    this.cancelPromise = cancelPromise;
    this.subscriptions = new Set();
    this.failed = false;
    this.completed = false;
    this.canceled = false;
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
    if (this.active) {
      return;
    }

    this.timer = setTimeout(() => this.cancel(), this.timeout);
    this.promise = this.createPromise();

    this.emit();

    try {
      await this.promise;
      this.completed = true;
    } catch (e) {
      this.error = e;
      this.failed = true;
    }

    delete this.promise;
    this.emit();
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

  get finished() {
    return this.promise;
  }
}
