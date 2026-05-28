import { normalizePhoneSearch, normalizeTextSearch } from './normalize-search'

describe('normalizeTextSearch', () => {
  it('lowercases and trims the value', () => {
    expect(normalizeTextSearch('  Maria  ')).toBe('maria')
  })

  it('removes accents so searches match regardless of diacritics', () => {
    expect(normalizeTextSearch('José')).toBe('jose')
    expect(normalizeTextSearch('São Paulo')).toBe('sao paulo')
    expect(normalizeTextSearch('AÇÃO')).toBe('acao')
  })

  it('keeps spaces between words', () => {
    expect(normalizeTextSearch('Ana Paula')).toBe('ana paula')
  })
})

describe('normalizePhoneSearch', () => {
  it('keeps only the digits', () => {
    expect(normalizePhoneSearch('(11) 99999-8888')).toBe('11999998888')
  })

  it('drops the country code symbols', () => {
    expect(normalizePhoneSearch('+55 11 3333 4444')).toBe('551133334444')
  })

  it('returns an empty string when there are no digits', () => {
    expect(normalizePhoneSearch('telefone')).toBe('')
  })
})
