import type { Timestamp } from 'firebase/firestore'

export type ContactRecord = {
  connectionId: string
  createdAt: Timestamp | null
  name: string
  normalizedName: string
  normalizedPhone: string
  ownerId: string
  phone: string
  updatedAt: Timestamp | null
}

export type ContactRow = ContactRecord & {
  id: string
}
