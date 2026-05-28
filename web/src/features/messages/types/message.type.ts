import type { Timestamp } from 'firebase/firestore'

export type MessageStatus = 'scheduled' | 'sent'

export type MessageContactSnapshot = {
  id: string
  name: string
  phone: string
}

export type MessageRecord = {
  connectionId: string
  contactIds: string[]
  contacts: MessageContactSnapshot[]
  content: string
  createdAt: Timestamp | null
  ownerId: string
  scheduledAt: Timestamp | null
  sentAt: Timestamp | null
  status: MessageStatus
  updatedAt: Timestamp | null
}

export type MessageRow = MessageRecord & {
  id: string
}
