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
  const orderField = search?.field ?? 'normalizedName'
  const constraints: QueryConstraint[] = [
    where('ownerId', '==', ownerId),
    where('connectionId', '==', connectionId),
    orderBy(orderField),
  ]

  if (search) {
    constraints.push(startAt(search.term), endAt(`${search.term}\uf8ff`))
  }

  if (cursor) {
    constraints.push(startAfter(cursor))
  }

  constraints.push(limit(CONTACTS_PAGE_SIZE + 1))

  const contactsQuery = query(
    collection(db, CONTACTS_COLLECTION),
    ...constraints,
  )

  return onSnapshot(
    contactsQuery,
    (snapshot) => {
      const visibleDocs = snapshot.docs.slice(0, CONTACTS_PAGE_SIZE)
      const lastVisibleDoc = visibleDocs.at(-1) ?? null

      onData({
        contacts: visibleDocs.map((item) => ({
          id: item.id,
          ...(item.data() as ContactRecord),
        })),
        hasNextPage: snapshot.docs.length > CONTACTS_PAGE_SIZE,
        lastCursor: lastVisibleDoc,
      })
    },
    onError,
  )
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
