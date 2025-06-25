import { useSyncExternalStore } from 'react';
import ToastItem from '~/components/ToastItem';
import { subscribe, getSnapshot, addToast, removeToast, showError, showSuccess, showWarning } from './store';

export function ToastContainer() {
  const toasts = useSyncExternalStore(subscribe, getSnapshot);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <div key={toast.id} className="mb-2">
            <ToastItem toast={toast} />
          </div>
        ))}
      </div>
    </div>
  );
}

export { addToast, removeToast, showError, showSuccess, showWarning };
