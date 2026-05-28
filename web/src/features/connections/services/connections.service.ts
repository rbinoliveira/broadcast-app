import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  type FirestoreError,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe,
  updateDoc,
  where,
} from 'firebase/firestore'

import { db } from '@/shared/lib/firebase'

import type { ConnectionFormValues } from '../schemas/connection.schema'
import type { ConnectionRecord, ConnectionRow } from '../types/connection.type'

const CONNECTIONS_COLLECTION = 'connections'

export function subscribeToConnections(
  ownerId: string,
  onData: (connections: ConnectionRow[]) => void,
  onError: (error: FirestoreError) => void,
): Unsubscribe {
  const connectionsQuery = query(
    collection(db, CONNECTIONS_COLLECTION),
    where('ownerId', '==', ownerId),
    orderBy('updatedAt', 'desc'),
  )

  return onSnapshot(
    connectionsQuery,
    (snapshot) => {
      onData(
        snapshot.docs.map((item) => ({
          id: item.id,
          ...(item.data() as ConnectionRecord),
        })),
      )
    },
    onError,
  )
}

export async function createConnection(
  ownerId: string,
  ownerEmail: string | null,
  data: ConnectionFormValues,
) {
  await addDoc(collection(db, CONNECTIONS_COLLECTION), {
    ...data,
    ownerId,
    ownerEmail,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateConnection(
  connectionId: string,
  data: ConnectionFormValues,
) {
  await updateDoc(doc(db, CONNECTIONS_COLLECTION, connectionId), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteConnection(connectionId: string) {
  await deleteDoc(doc(db, CONNECTIONS_COLLECTION, connectionId))
}
