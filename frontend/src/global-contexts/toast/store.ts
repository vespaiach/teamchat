import { generateRandomId } from '~/utils/string';

let toasts: Toast[] = [];
let listeners: Array<() => void> = [];

export function addToast(toast: Omit<Toast, 'id'>) {
  const id = generateRandomId();
  toasts = [...toasts, { ...toast, id }];
  emitChange();
}

export function removeToast(id: string) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emitChange();
}

export function showSuccess(message: string, title?: string) {
  addToast({ type: 'success', message, title });
}

export function showError(message: string, title?: string) {
  addToast({ type: 'error', message, title });
}

export function showWarning(message: string, title?: string) {
  addToast({ type: 'warning', message, title });
}

export function subscribe(listener: () => void) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

export function getSnapshot() {
  return toasts;
}

function emitChange() {
  for (const l of listeners) {
    l();
  }
}
