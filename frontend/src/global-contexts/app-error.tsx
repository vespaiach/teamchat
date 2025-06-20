import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

interface ErrorContextType {
  errors: AppError[];
  addError: (error: AppError) => void;
}

const AppErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function AppErrorContextProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<AppError[]>([]);
  const addError = useCallback((error: AppError) => {
    setErrors((prevErrors) => [...prevErrors, error]);
  }, []);

  useEffect(() => {
    console.log('AppErrorContextProvider mounted');
    const errorStrings = document.getElementById('app-errors')?.textContent
    if (errorStrings) {
      try {
        const parsedErrors = JSON.parse(errorStrings) as AppError[];
        setErrors((prevErrors) => [...prevErrors, ...parsedErrors]);
      } catch (e) {
        console.error('Failed to parse app errors:', e);
      }
    }
    return () => {
      console.log('AppErrorContextProvider unmounted');
      // Optionally clear errors on unmount
      setErrors([]);
    };
  }, []);

  return <AppErrorContext.Provider value={{ errors, addError }}>{children}</AppErrorContext.Provider>;
}

export function useAppErrors(): ErrorContextType {
  const context = useContext(AppErrorContext);
  if (context === undefined) {
    throw new Error('useAppErrors must be used within a AppErrorContextProvider');
  }
  return context;
}
