export function cx (...name: unknown[]): string | undefined {
  return name.filter(Boolean).map((s) => String(s).trim().replace(/\s+|\n/g, ' ')).join(' ') || undefined
}