

class ToastEmitter extends EventTarget {
  private static instance: ToastEmitter;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (ToastEmitter.instance) {
      return ToastEmitter.instance;
    }
    ToastEmitter.instance = new ToastEmitter();
    return ToastEmitter.instance;
  }

  addToast(toast: ToastInput) {
    this.dispatchEvent(new CustomEvent('addToast', { detail: toast }));
  }

  removeToast(id: string) {
    this.dispatchEvent(new CustomEvent('removeToast', { detail: id }));
  }
}

const toastEvent = ToastEmitter.getInstance()
export default toastEvent;
