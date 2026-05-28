import { getDisplayName, getInitials } from './user-display'

describe('getDisplayName', () => {
  it('uses the name when it is present', () => {
    expect(getDisplayName('  Rubens  ')).toBe('Rubens')
  })

  it('falls back to a generic label when the name is missing', () => {
    expect(getDisplayName('')).toBe('Usuario')
    expect(getDisplayName('   ')).toBe('Usuario')
    expect(getDisplayName(null)).toBe('Usuario')
    expect(getDisplayName(undefined)).toBe('Usuario')
  })
})

describe('getInitials', () => {
  it('takes the first letter of the first two words', () => {
    expect(getInitials('José Silva')).toBe('JS')
    expect(getInitials('ana paula souza')).toBe('AP')
  })

  it('handles a single word', () => {
    expect(getInitials('Madonna')).toBe('M')
  })

  it('returns an empty string for blank input', () => {
    expect(getInitials('   ')).toBe('')
  })
})
