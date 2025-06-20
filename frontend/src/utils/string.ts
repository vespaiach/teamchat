export function cx (...name: unknown[]): string | undefined {
  return name.filter(Boolean).map((s) => String(s).trim().replace(/\s+|\n/g, ' ')).join(' ') || undefined
}

export function generateRandomId() {
  return 'id-' + Math.random().toString(36).substring(2, 9) + '-' + Date.now().toString(36);
}