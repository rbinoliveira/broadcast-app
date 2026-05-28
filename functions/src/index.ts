import { initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore, Timestamp } from 'firebase-admin/firestore'
import { setGlobalOptions } from 'firebase-functions'
import { onSchedule } from 'firebase-functions/scheduler'

setGlobalOptions({ maxInstances: 10, region: 'southamerica-east1' })

initializeApp()

const db = getFirestore()

export const processScheduledMessages = onSchedule(
  {
    schedule: 'every 1 minutes',
    timeZone: 'America/Fortaleza',
  },
  async () => {
    const now = Timestamp.now()
    const snapshot = await db
      .collection('messages')
      .where('status', '==', 'scheduled')
      .where('scheduledAt', '<=', now)
      .orderBy('scheduledAt', 'asc')
      .limit(100)
      .get()

    if (snapshot.empty) {
      return
    }

    const batch = db.batch()

    snapshot.docs.forEach((message) => {
      batch.update(message.ref, {
        sentAt: FieldValue.serverTimestamp(),
        status: 'sent',
        updatedAt: FieldValue.serverTimestamp(),
      })
    })

    await batch.commit()
  },
)
