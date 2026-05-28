export function getDisplayName(
  name: string | null | undefined,
  email: string | null | undefined,
) {
  return name?.trim() || email?.split('@')[0] || 'Usuario'
}

export function getInitials(value: string) {
  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}
