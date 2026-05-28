import type { Timestamp } from 'firebase/firestore'

export type ConnectionRecord = {
  createdAt: Timestamp | null
  ownerEmail: string | null
  ownerId: string
  updatedAt: Timestamp | null
  name: string
}

export type ConnectionRow = ConnectionRecord & {
  id: string
}
