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
  type Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '@/shared/lib/firebase'
import {
  normalizePhoneSearch,
  normalizeTextSearch,
} from '@/shared/utils/normalize-search'

import type { ContactFormValues } from '../schemas/contact.schema'
import type { ContactRecord, ContactRow } from '../types/contact.type'

export const CONTACTS_PAGE_SIZE = 10

const CONTACTS_COLLECTION = 'contacts'

export type ContactPageCursor = QueryDocumentSnapshot<DocumentData> | null

export type ContactSearch = {
  field: 'normalizedName' | 'normalizedPhone'
  term: string
} | null

type SubscribeToContactsParams = {
  connectionId: string
  cursor: ContactPageCursor
  ownerId: string
  search: ContactSearch
}

function getTimestampMillis(timestamp: ContactRecord['updatedAt']) {
  return timestamp?.toMillis() ?? 0
}

function getContactSearch(rawSearch: string): ContactSearch {
  const textTerm = normalizeTextSearch(rawSearch)

  if (!textTerm) {
    return null
  }

  const phoneTerm = normalizePhoneSearch(rawSearch)
  const hasLetters = /[a-z]/.test(textTerm)

  if (!hasLetters && phoneTerm) {
    return { field: 'normalizedPhone', term: phoneTerm }
  }

  return { field: 'normalizedName', term: textTerm }
}

export function normalizeContactSearch(rawSearch: string) {
  return getContactSearch(rawSearch)
}

export function subscribeToContacts(
  { connectionId, cursor, ownerId, search }: SubscribeToContactsParams,
  onData: (params: {
    contacts: ContactRow[]
    hasNextPage: boolean
    lastCursor: ContactPageCursor
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
            const data = item.data() as ContactRecord

            if (!search) {
              return true
            }

            return data[search.field]?.startsWith(search.term)
          })
          .sort((first, second) => {
            const firstData = first.data() as ContactRecord
            const secondData = second.data() as ContactRecord

            if (search) {
              return firstData[search.field].localeCompare(
                secondData[search.field],
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
      startIndex + CONTACTS_PAGE_SIZE + 1,
    )
    const visibleDocs = pageDocs.slice(0, CONTACTS_PAGE_SIZE)
    const lastVisibleDoc = visibleDocs.at(-1) ?? null

    onData({
      contacts: visibleDocs.map((item) => ({
        id: item.id,
        ...(item.data() as ContactRecord),
      })),
      hasNextPage: pageDocs.length > CONTACTS_PAGE_SIZE,
      lastCursor: lastVisibleDoc,
    })
  }

  const subscribeToFallbackQuery = () => {
    const fallbackQuery = query(
      collection(db, CONTACTS_COLLECTION),
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

  if (search) {
    constraints.push(
      orderBy(search.field),
      startAt(search.term),
      endAt(`${search.term}\uf8ff`),
    )
  } else {
    constraints.push(orderBy('updatedAt', 'desc'))
  }

  if (cursor) {
    constraints.push(startAfter(cursor))
  }

  constraints.push(limit(CONTACTS_PAGE_SIZE + 1))

  const contactsQuery = query(
    collection(db, CONTACTS_COLLECTION),
    ...constraints,
  )

  let fallbackUnsubscribe: Unsubscribe | null = null

  const unsubscribe = onSnapshot(
    contactsQuery,
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

export function subscribeToConnectionContacts(
  ownerId: string,
  connectionId: string,
  onData: (contacts: ContactRow[]) => void,
  onError: (error: FirestoreError) => void,
): Unsubscribe {
  const handleSnapshot = (
    docs: QueryDocumentSnapshot<DocumentData>[],
    usesClientSort = false,
  ) => {
    const preparedDocs = usesClientSort
      ? docs.toSorted((first, second) => {
          const firstData = first.data() as ContactRecord
          const secondData = second.data() as ContactRecord

          return firstData.normalizedName.localeCompare(
            secondData.normalizedName,
          )
        })
      : docs

    onData(
      preparedDocs.map((item) => ({
        id: item.id,
        ...(item.data() as ContactRecord),
      })),
    )
  }

  const subscribeToFallbackQuery = () => {
    const fallbackQuery = query(
      collection(db, CONTACTS_COLLECTION),
      where('ownerId', '==', ownerId),
      where('connectionId', '==', connectionId),
    )

    return onSnapshot(
      fallbackQuery,
      (snapshot) => handleSnapshot(snapshot.docs, true),
      onError,
    )
  }

  const contactsQuery = query(
    collection(db, CONTACTS_COLLECTION),
    where('ownerId', '==', ownerId),
    where('connectionId', '==', connectionId),
    orderBy('normalizedName'),
  )

  let fallbackUnsubscribe: Unsubscribe | null = null

  const unsubscribe = onSnapshot(
    contactsQuery,
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

export async function createContact(
  ownerId: string,
  connectionId: string,
  data: ContactFormValues,
) {
  await addDoc(collection(db, CONTACTS_COLLECTION), {
    ...data,
    connectionId,
    normalizedName: normalizeTextSearch(data.name),
    normalizedPhone: normalizePhoneSearch(data.phone),
    ownerId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateContact(
  contactId: string,
  data: ContactFormValues,
) {
  await updateDoc(doc(db, CONTACTS_COLLECTION, contactId), {
    ...data,
    normalizedName: normalizeTextSearch(data.name),
    normalizedPhone: normalizePhoneSearch(data.phone),
    updatedAt: serverTimestamp(),
  })
}

export async function deleteContact(contactId: string) {
  await deleteDoc(doc(db, CONTACTS_COLLECTION, contactId))
}
