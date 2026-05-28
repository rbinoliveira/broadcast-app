import { maskPhone } from './phone-mask'

describe('maskPhone', () => {
  it('returns an empty string when there are no digits', () => {
    expect(maskPhone('')).toBe('')
    expect(maskPhone('abc')).toBe('')
  })

  it('opens the parenthesis while the area code is being typed', () => {
    expect(maskPhone('1')).toBe('(1')
    expect(maskPhone('11')).toBe('(11')
  })

  it('formats a landline number', () => {
    expect(maskPhone('1133334444')).toBe('(11) 3333-4444')
  })

  it('formats a mobile number with the 9th digit', () => {
    expect(maskPhone('11999998888')).toBe('(11) 99999-8888')
  })

  it('keeps the result stable when the value is already masked', () => {
    expect(maskPhone('(11) 99999-8888')).toBe('(11) 99999-8888')
  })

  it('ignores anything beyond 11 digits', () => {
    expect(maskPhone('11999998888000')).toBe('(11) 99999-8888')
  })

  it('strips letters and symbols before masking', () => {
    expect(maskPhone('+55 (11) 9abc')).toBe('(55) 119')
  })
})
