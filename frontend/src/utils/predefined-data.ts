export default function getPredefinedData<T = unknown>(id: string) {
  const data = document.getElementById(id)?.textContent;
  if (data) {
    try {
      return JSON.parse(data) as T;
    } catch (e) {
      console.error('Failed to parse user data:', e);
      return null;
    }
  }

  return null;
}
