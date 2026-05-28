export function normalizeTextSearch(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export function normalizePhoneSearch(value: string) {
  return value.replace(/\D/g, '')
}
