import { messageSchema } from './message.schema'

function buildMessage(overrides: Record<string, unknown> = {}) {
  return {
    contactIds: ['contact-1'],
    content: 'Olá, tudo bem?',
    scheduledAt: '',
    sendMode: 'now',
    ...overrides,
  }
}

describe('messageSchema', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-28T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('accepts an immediate message without a scheduled date', () => {
    const result = messageSchema.safeParse(buildMessage())

    expect(result.success).toBe(true)
  })

  it('requires at least one contact', () => {
    const result = messageSchema.safeParse(buildMessage({ contactIds: [] }))

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe(
      'Selecione pelo menos um contato',
    )
  })

  it('requires a non-empty content', () => {
    const result = messageSchema.safeParse(buildMessage({ content: '   ' }))

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('Informe a mensagem')
  })

  it('requires a date when the message is scheduled', () => {
    const result = messageSchema.safeParse(
      buildMessage({ sendMode: 'scheduled', scheduledAt: '' }),
    )

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe(
      'Informe a data de agendamento',
    )
  })

  it('rejects a scheduled date in the past', () => {
    const result = messageSchema.safeParse(
      buildMessage({
        sendMode: 'scheduled',
        scheduledAt: '2020-01-01T10:00',
      }),
    )

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe(
      'O agendamento deve ser em uma data futura',
    )
  })

  it('accepts a scheduled date in the future', () => {
    const result = messageSchema.safeParse(
      buildMessage({
        sendMode: 'scheduled',
        scheduledAt: '2026-12-31T10:00',
      }),
    )

    expect(result.success).toBe(true)
  })
})
