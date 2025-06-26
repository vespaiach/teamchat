import { showError } from '~/global-contexts/toast';

export async function apiCall<T  = unknown>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
  };

  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const data = await response.json();
      showError(data.error || 'An unexpected error occurred');
      return { success: false, error: data.error || 'An unexpected error occurred' } as ApiResponse<T>;
    }
    return { success: true, data: (await response.json()) } as ApiResponse<T>;
  } catch (error) {
    // Handle network errors or other unexpected issues
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    showError(errorMessage);
    return { success: false, error: errorMessage } as ApiResponse<T>;
  }
}

export function get<T = unknown>(url: string, params?: Record<string, string>) {
  const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiCall<T>(url + queryString, { method: 'GET' });
}

export function post<T = unknown>(url: string, body: Record<string, unknown>) {
  return apiCall<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function put<T = unknown>(url: string, body: Record<string, unknown>) {
  return apiCall<T>(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}
