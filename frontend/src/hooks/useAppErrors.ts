import { useEffect, useRef } from 'react';
import { useToast } from '~/global-contexts/toast';

export default function useShowServerErrors() {
  const { showError } = useToast();
  const showErrorRef = useRef<(m: string) => void | null>(null);
  showErrorRef.current = (message: string) => {
    showError('An error occurred', message);
  };

  useEffect(() => {
    const errorStrings = document.getElementById('server-errors')?.textContent;
    if (errorStrings) {
      try {
        const parsedErrors = JSON.parse(errorStrings) as AppError[];
        parsedErrors.forEach((error) => {
          showErrorRef.current?.(error.message);
        });
      } catch (e) {
        console.error('Failed to parse app errors:', e);
      }
    }
  }, []);
}
