import { createContext, useCallback, useContext, useState } from 'react';
import type { Toast } from '~/components/ToastItem';
import ToastItem from '~/components/ToastItem';
import { generateRandomId } from '~/utils/string';

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = generateRandomId();
      const newToast = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showSuccess = useCallback(
    (message: string, title?: string) => {
      addToast({ type: 'success', message, title });
    },
    [addToast]
  );

  const showError = useCallback(
    (message: string, title?: string) => {
      addToast({ type: 'error', message, title });
    },
    [addToast]
  );

  const showWarning = useCallback(
    (message: string, title?: string) => {
      addToast({ type: 'warning', message, title });
    },
    [addToast]
  );

  const contextValue = {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Toast Container Component
interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      <div className="pointer-events-auto">
        {toasts.map((toast) => (
          <div key={toast.id} className="mb-2">
            <ToastItem toast={toast} onRemove={onRemove} />
          </div>
        ))}
      </div>
    </div>
  );
}
