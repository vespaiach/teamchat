import { useEffect, useRef } from 'react';

export function useClickOutside<T extends Element>(cb: (e: Event) => void) {
  const elementRef = useRef<T>(null);
  const callbackRef = useRef(cb);

  callbackRef.current = cb;

  useEffect(() => {
    const handler = (e: Event) => {
      const element = elementRef.current;
      if (element && !element.contains(e.target as Node)) {
        callbackRef.current(e);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return elementRef;
}
