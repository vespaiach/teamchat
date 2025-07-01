import { showError } from '~/global-contexts/toast';

export async function apiCall<T = unknown>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const defaultHeaders = {
    Accept: 'application/json',
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
    return { success: true, data: await response.json() } as ApiResponse<T>;
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

export function post<T = unknown>(url: string, body: Record<string, unknown> | FormData) {
  return apiCall<T>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function put<T = unknown>(url: string, body: Record<string, unknown>) {
  return apiCall<T>(url, { method: 'PUT', body: JSON.stringify(body) });
}

export function del<T = unknown>(url: string, params?: Record<string, string>) {
  const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
  return apiCall<T>(url + queryString, { method: 'DELETE' });
}

export function upload<T = unknown>(
  url: string,
  body: FormData,
  onProgress?: (progress: number) => void
): Promise<ApiResponse<T>> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          onProgress(progress);
        }
      });
    }

    // Handle completion
    xhr.addEventListener('load', async () => {
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          resolve({ success: true, data } as ApiResponse<T>);
        } else {
          const errorData = JSON.parse(xhr.responseText);
          showError(errorData.error || 'An unexpected error occurred');
          resolve({ success: false, error: errorData.error || 'An unexpected error occurred' } as ApiResponse<T>);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        showError(errorMessage);
        resolve({ success: false, error: errorMessage } as ApiResponse<T>);
      }
    });

    // Handle errors
    xhr.addEventListener('error', () => {
      const errorMessage = 'Network error occurred';
      showError(errorMessage);
      resolve({ success: false, error: errorMessage } as ApiResponse<T>);
    });

    // Set up request
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    xhr.open('POST', url);
    xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    xhr.setRequestHeader('Accept', 'application/json');

    // Send request
    xhr.send(body);
  });
}
