import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type DocumentData,
  endAt,
  type FirestoreError,
  limit,
  onSnapshot,
  orderBy,
  query,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  serverTimestamp,
  startAfter,
  startAt,
  Timestamp,
  type Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '@/shared/lib/firebase'
import { normalizeTextSearch } from '@/shared/utils/normalize-search'

import type { ContactRow } from '../../contacts/types/contact.type'
import type { MessageFormValues } from '../schemas/message.schema'
import type {
  MessageContactSnapshot,
  MessageRecord,
  MessageRow,
  MessageStatus,
} from '../types/message.type'

export const MESSAGES_PAGE_SIZE = 10

const MESSAGES_COLLECTION = 'messages'

export type MessageStatusFilter = MessageStatus | 'all'

export type MessagePageCursor = QueryDocumentSnapshot<DocumentData> | null

type SubscribeToMessagesParams = {
  connectionId: string
  cursor: MessagePageCursor
  ownerId: string
  search: string | null
  status: MessageStatusFilter
}

export function normalizeMessageSearch(rawSearch: string): string | null {
  return normalizeTextSearch(rawSearch) || null
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
  { connectionId, cursor, ownerId, search, status }: SubscribeToMessagesParams,
  onData: (params: {
    messages: MessageRow[]
    hasNextPage: boolean
    lastCursor: MessagePageCursor
  }) => void,
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

            if (status !== 'all' && data.status !== status) {
              return false
            }

            return !search || data.normalizedContent?.startsWith(search)
          })
          .sort((first, second) => {
            const firstData = first.data() as MessageRecord
            const secondData = second.data() as MessageRecord

            if (search) {
              return firstData.normalizedContent.localeCompare(
                secondData.normalizedContent,
              )
            }

            return (
              getTimestampMillis(secondData.updatedAt) -
              getTimestampMillis(firstData.updatedAt)
            )
          })
      : docs

    const cursorIndex = cursor
      ? preparedDocs.findIndex((item) => item.id === cursor.id)
      : -1
    const startIndex = cursorIndex >= 0 ? cursorIndex + 1 : 0
    const pageDocs = preparedDocs.slice(
      startIndex,
      startIndex + MESSAGES_PAGE_SIZE + 1,
    )
    const visibleDocs = pageDocs.slice(0, MESSAGES_PAGE_SIZE)
    const lastVisibleDoc = visibleDocs.at(-1) ?? null

    onData({
      messages: visibleDocs.map((item) => ({
        id: item.id,
        ...(item.data() as MessageRecord),
      })),
      hasNextPage: pageDocs.length > MESSAGES_PAGE_SIZE,
      lastCursor: lastVisibleDoc,
    })
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

  if (search) {
    constraints.push(
      orderBy('normalizedContent'),
      startAt(search),
      endAt(`${search}`),
    )
  } else {
    constraints.push(orderBy('updatedAt', 'desc'))
  }

  if (cursor) {
    constraints.push(startAfter(cursor))
  }

  constraints.push(limit(MESSAGES_PAGE_SIZE + 1))

  const messagesQuery = query(
    collection(db, MESSAGES_COLLECTION),
    ...constraints,
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
    normalizedContent: normalizeTextSearch(data.content),
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
    normalizedContent: normalizeTextSearch(data.content),
    ...dates,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteMessage(messageId: string) {
  await deleteDoc(doc(db, MESSAGES_COLLECTION, messageId))
}
