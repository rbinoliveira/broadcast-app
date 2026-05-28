import { normalizePhoneSearch } from '@/shared/utils/normalize-search'

export function maskPhone(value: string) {
  const digits = normalizePhoneSearch(value).slice(0, 11)
  const areaCode = digits.slice(0, 2)
  const number = digits.slice(2)

  if (digits.length <= 2) {
    return areaCode ? `(${areaCode}` : ''
  }

  if (number.length <= 4) {
    return `(${areaCode}) ${number}`
  }

  if (number.length <= 8) {
    return `(${areaCode}) ${number.slice(0, 4)}-${number.slice(4)}`
  }

  return `(${areaCode}) ${number.slice(0, 5)}-${number.slice(5)}`
}
