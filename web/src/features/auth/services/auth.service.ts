import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

type SignUpParams = {
  email: string
  name: string
  password: string
}

type SignInParams = {
  email: string
  password: string
}

export async function signUpWithEmail({ email, name, password }: SignUpParams) {
  const credential = await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(credential.user, { displayName: name })

  return credential.user
}

export async function signInWithEmail({ email, password }: SignInParams) {
  const credential = await signInWithEmailAndPassword(auth, email, password)

  return credential.user
}

export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email)
}

export async function signOutUser() {
  await signOut(auth)
}
