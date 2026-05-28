import { existsSync, readFileSync, writeFileSync } from 'node:fs'

import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const DEFAULT_CREDENTIALS = {
  email: 'e2e-tester@broadcast.app',
  password: 'Broadcast-E2E-123',
}

function loadOrCreateCredentials() {
  if (existsSync('cypress.env.json')) {
    const env = JSON.parse(readFileSync('cypress.env.json', 'utf8'))
    if (env.email && env.password) {
      return env
    }
  }

  writeFileSync(
    'cypress.env.json',
    `${JSON.stringify(DEFAULT_CREDENTIALS, null, 2)}\n`,
  )
  console.log('• cypress.env.json criado com credenciais padrão de teste.')
  return DEFAULT_CREDENTIALS
}

function parseEnvFile(path) {
  if (!existsSync(path)) {
    console.error(`\n✖ ${path} não encontrado.`)
    console.error('  Configure as variáveis VITE_FIREBASE_* antes do seed.\n')
    process.exit(1)
  }

  const env = {}
  for (const line of readFileSync(path, 'utf8').split('\n')) {
    const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/)
    if (match) {
      env[match[1]] = match[2].replace(/^["']|["']$/g, '')
    }
  }
  return env
}

const credentials = loadOrCreateCredentials()
const env = parseEnvFile('.env.local')

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
}

const auth = getAuth(initializeApp(firebaseConfig))

try {
  await createUserWithEmailAndPassword(
    auth,
    credentials.email,
    credentials.password,
  )
  console.log(`✓ Usuário de teste criado: ${credentials.email}`)
} catch (error) {
  if (error.code === 'auth/email-already-in-use') {
    console.log(`✓ Usuário de teste já existe: ${credentials.email}`)
  } else {
    console.error('\n✖ Falha ao criar o usuário de teste:', error.code ?? error)
    process.exit(1)
  }
}

process.exit(0)
