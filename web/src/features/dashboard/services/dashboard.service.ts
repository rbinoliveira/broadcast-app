import {
  collection,
  type FirestoreError,
  onSnapshot,
  query,
  type Unsubscribe,
  where,
} from 'firebase/firestore'

import { db } from '@/shared/lib/firebase'

import type { MessageRecord } from '../../messages/types/message.type'

export type DashboardStats = {
  connections: number
  contacts: number
  scheduledMessages: number
  sentMessages: number
  totalMessages: number
}

type DashboardStatsSnapshot = Partial<DashboardStats>

const emptyStats: DashboardStats = {
  connections: 0,
  contacts: 0,
  scheduledMessages: 0,
  sentMessages: 0,
  totalMessages: 0,
}

function getStats(nextStats: DashboardStatsSnapshot): DashboardStats {
  return {
    ...emptyStats,
    ...nextStats,
  }
}

export function subscribeToDashboardStats(
  ownerId: string,
  onData: (stats: DashboardStats) => void,
  onError: (error: FirestoreError) => void,
): Unsubscribe {
  let currentStats: DashboardStatsSnapshot = {}

  function updateStats(nextStats: DashboardStatsSnapshot) {
    currentStats = { ...currentStats, ...nextStats }
    onData(getStats(currentStats))
  }

  const connectionsUnsubscribe = onSnapshot(
    query(collection(db, 'connections'), where('ownerId', '==', ownerId)),
    (snapshot) => updateStats({ connections: snapshot.size }),
    onError,
  )

  const contactsUnsubscribe = onSnapshot(
    query(collection(db, 'contacts'), where('ownerId', '==', ownerId)),
    (snapshot) => updateStats({ contacts: snapshot.size }),
    onError,
  )

  const messagesUnsubscribe = onSnapshot(
    query(collection(db, 'messages'), where('ownerId', '==', ownerId)),
    (snapshot) => {
      const messages = snapshot.docs.map(
        (message) => message.data() as MessageRecord,
      )
      const sentMessages = messages.filter(
        (message) => message.status === 'sent',
      ).length
      const scheduledMessages = messages.filter(
        (message) => message.status === 'scheduled',
      ).length

      updateStats({
        scheduledMessages,
        sentMessages,
        totalMessages: snapshot.size,
      })
    },
    onError,
  )

  return () => {
    connectionsUnsubscribe()
    contactsUnsubscribe()
    messagesUnsubscribe()
  }
}
