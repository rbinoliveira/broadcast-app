import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type DocumentData,
  type FirestoreError,
  onSnapshot,
  orderBy,
  query,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  serverTimestamp,
  Timestamp,
  type Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '@/shared/lib/firebase'

import type { ContactRow } from '../../contacts/types/contact.type'
import type { MessageFormValues } from '../schemas/message.schema'
import type {
  MessageContactSnapshot,
  MessageRecord,
  MessageRow,
  MessageStatus,
} from '../types/message.type'

const MESSAGES_COLLECTION = 'messages'

export type MessageStatusFilter = MessageStatus | 'all'

type SubscribeToMessagesParams = {
  connectionId: string
  ownerId: string
  status: MessageStatusFilter
}

function getTimestampMillis(timestamp: MessageRecord['updatedAt']) {
  return timestamp?.toMillis() ?? 0
}

function getSelectedContactSnapshots(
  contacts: ContactRow[],
  contactIds: string[],
): MessageContactSnapshot[] {
  return contactIds
    .map((contactId) => contacts.find((contact) => contact.id === contactId))
    .filter((contact): contact is ContactRow => Boolean(contact))
    .map((contact) => ({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
    }))
}

function getMessageDates(data: MessageFormValues) {
  if (data.sendMode === 'scheduled') {
    return {
      scheduledAt: Timestamp.fromDate(new Date(data.scheduledAt)),
      sentAt: null,
      status: 'scheduled' as const,
    }
  }

  return {
    scheduledAt: null,
    sentAt: serverTimestamp(),
    status: 'sent' as const,
  }
}

export function subscribeToMessages(
  { connectionId, ownerId, status }: SubscribeToMessagesParams,
  onData: (messages: MessageRow[]) => void,
  onError: (error: FirestoreError) => void,
): Unsubscribe {
  const handleSnapshot = (
    docs: QueryDocumentSnapshot<DocumentData>[],
    usesClientFilters = false,
  ) => {
    const preparedDocs = usesClientFilters
      ? docs
          .filter((item) => {
            const data = item.data() as MessageRecord

            return status === 'all' || data.status === status
          })
          .sort((first, second) => {
            const firstData = first.data() as MessageRecord
            const secondData = second.data() as MessageRecord

            return (
              getTimestampMillis(secondData.updatedAt) -
              getTimestampMillis(firstData.updatedAt)
            )
          })
      : docs

    onData(
      preparedDocs.map((item) => ({
        id: item.id,
        ...(item.data() as MessageRecord),
      })),
    )
  }

  const subscribeToFallbackQuery = () => {
    const fallbackQuery = query(
      collection(db, MESSAGES_COLLECTION),
      where('ownerId', '==', ownerId),
      where('connectionId', '==', connectionId),
    )

    return onSnapshot(
      fallbackQuery,
      (snapshot) => handleSnapshot(snapshot.docs, true),
      onError,
    )
  }

  const constraints: QueryConstraint[] = [
    where('ownerId', '==', ownerId),
    where('connectionId', '==', connectionId),
  ]

  if (status !== 'all') {
    constraints.push(where('status', '==', status))
  }

  const messagesQuery = query(
    collection(db, MESSAGES_COLLECTION),
    ...constraints,
    orderBy('updatedAt', 'desc'),
  )

  let fallbackUnsubscribe: Unsubscribe | null = null

  const unsubscribe = onSnapshot(
    messagesQuery,
    (snapshot) => handleSnapshot(snapshot.docs),
    (error) => {
      if (error.code === 'failed-precondition') {
        fallbackUnsubscribe = subscribeToFallbackQuery()
        return
      }

      onError(error)
    },
  )

  return () => {
    fallbackUnsubscribe?.()
    unsubscribe()
  }
}

export async function createMessage(
  ownerId: string,
  connectionId: string,
  contacts: ContactRow[],
  data: MessageFormValues,
) {
  const dates = getMessageDates(data)

  await addDoc(collection(db, MESSAGES_COLLECTION), {
    connectionId,
    contactIds: data.contactIds,
    contacts: getSelectedContactSnapshots(contacts, data.contactIds),
    content: data.content,
    ownerId,
    ...dates,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateMessage(
  messageId: string,
  contacts: ContactRow[],
  data: MessageFormValues,
) {
  const dates = getMessageDates(data)

  await updateDoc(doc(db, MESSAGES_COLLECTION, messageId), {
    contactIds: data.contactIds,
    contacts: getSelectedContactSnapshots(contacts, data.contactIds),
    content: data.content,
    ...dates,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteMessage(messageId: string) {
  await deleteDoc(doc(db, MESSAGES_COLLECTION, messageId))
}
