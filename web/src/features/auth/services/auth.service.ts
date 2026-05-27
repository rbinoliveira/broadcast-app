import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'

import { auth } from '@/shared/lib/firebase'

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

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

export async function signInWithGoogle() {
  const credential = await signInWithPopup(auth, googleProvider)

  return credential.user
}

export async function sendPasswordReset(email: string) {
  await sendPasswordResetEmail(auth, email)
}

export async function signOutUser() {
  await signOut(auth)
}
