export function normalizeSearch(input: string): string {
  return input.trim().replace(/\s+/g, ' ').toLocaleLowerCase('en-US')
}
