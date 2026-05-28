export function getDisplayName(name: string | null | undefined) {
  return name?.trim() || 'Usuario'
}

export function getInitials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}
