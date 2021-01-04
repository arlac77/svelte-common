export class Action {
  constructor(_start, options = {}) {
    this.failed = false;
    this.completed = false;
    this.canceled = false;

    let disabled = options.disabled || false;
    let title = options.title;
    let shortcuts = options.shortcuts;

    Object.defineProperties(this, {
      _start: { value: _start },
      _cancel: { value: options.cancel || (() => {}) },
      subscriptions: { value: new Set() },
      disabled: {
        get: () => disabled,
        set: value => {
          if (disabled !== value) {
            disabled = value;
            this.emit();
          }
        }
      },
      title: {
        get: () => title,
        set: value => {
          if (title !== value) {
            title = value;
            this.emit();
          }
        }
      },
      shortcuts: {
        get: () => shortcuts,
        set: value => {
          if (shortcuts !== value) {
            shortcuts = value;
            this.emit();
          }
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
    this.promise = this._start();

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

    await this._cancel();
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
