import { useEffect, useMemo, useState } from 'react';

export default function useCSRFToken() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  const csrfTokenElement = useMemo(() => {
    return csrfToken ? <input type="hidden" name="authenticity_token" value={csrfToken} /> : null;
  }, [csrfToken]);

  useEffect(() => {
    setCsrfToken(document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? null);
  }, []);

  return {
    csrfToken,
    csrfTokenElement,
  };
}
