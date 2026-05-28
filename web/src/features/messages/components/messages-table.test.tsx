import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { MessageRow } from '../types/message.type'
import { MessagesTable } from './messages-table'

function buildMessage(overrides: Partial<MessageRow> = {}): MessageRow {
  return {
    id: 'message-1',
    connectionId: 'connection-1',
    contactIds: ['contact-1'],
    contacts: [{ id: 'contact-1', name: 'Maria', phone: '11999998888' }],
    content: 'Promoção da semana',
    normalizedContent: 'promocao da semana',
    ownerId: 'owner-1',
    status: 'scheduled',
    scheduledAt: null,
    sentAt: null,
    createdAt: null,
    updatedAt: null,
    ...overrides,
  }
}

const noop = () => {}

const baseProps = {
  hasNextPage: false,
  loading: false,
  messages: [buildMessage()],
  onDelete: noop,
  onEdit: noop,
  onNextPage: noop,
  onPreviousPage: noop,
  page: 0,
}

describe('MessagesTable', () => {
  it('shows the empty state when there are no messages', () => {
    render(<MessagesTable {...baseProps} messages={[]} />)

    expect(screen.getByText('Nenhuma mensagem encontrada.')).toBeInTheDocument()
  })

  it('renders the message content and recipients', () => {
    render(<MessagesTable {...baseProps} />)

    expect(screen.getByText('Promoção da semana')).toBeInTheDocument()
    expect(screen.getByText('Maria')).toBeInTheDocument()
  })

  it('disables "Anterior" on the first page', () => {
    render(<MessagesTable {...baseProps} page={0} />)

    expect(screen.getByRole('button', { name: 'Anterior' })).toBeDisabled()
  })

  it('disables "Próxima" when there is no next page', () => {
    render(<MessagesTable {...baseProps} hasNextPage={false} />)

    expect(screen.getByRole('button', { name: 'Próxima' })).toBeDisabled()
  })

  it('asks for the next page when "Próxima" is clicked', async () => {
    const onNextPage = vi.fn()
    const user = userEvent.setup()
    render(<MessagesTable {...baseProps} hasNextPage onNextPage={onNextPage} />)

    await user.click(screen.getByRole('button', { name: 'Próxima' }))

    expect(onNextPage).toHaveBeenCalledOnce()
  })

  it('hides the edit action for messages that were already sent', () => {
    render(
      <MessagesTable
        {...baseProps}
        messages={[buildMessage({ status: 'sent' })]}
      />,
    )

    expect(
      screen.queryByRole('button', { name: 'Editar mensagem' }),
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Excluir mensagem' }),
    ).toBeInTheDocument()
  })
})
