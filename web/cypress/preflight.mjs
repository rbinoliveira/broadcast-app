import { readFileSync } from 'node:fs'

const baseUrl = 'http://localhost:5173'

function fail(title, ...hints) {
  console.error(`\n✖ ${title}`)
  for (const hint of hints) {
    console.error(`  ${hint}`)
  }
  console.error('')
  process.exit(1)
}

function hasCredentials() {
  if (process.env.CYPRESS_email && process.env.CYPRESS_password) {
    return true
  }

  try {
    const env = JSON.parse(readFileSync('cypress.env.json', 'utf8'))
    return Boolean(env.email && env.password)
  } catch {
    return false
  }
}

if (!hasCredentials()) {
  fail(
    'Credenciais de teste ausentes.',
    'Crie web/cypress.env.json com "email" e "password" de um usuário válido.',
    'Use o modelo cypress.env.example.json.',
  )
}

try {
  const response = await fetch(baseUrl, { redirect: 'manual' })
  const html = await response.text()

  if (response.status >= 500) {
    fail(`App respondeu ${response.status} em ${baseUrl}.`, 'Verifique o pnpm dev.')
  }

  if (!html.includes('Broadcast')) {
    fail(
      `A resposta em ${baseUrl} não parece ser o app Broadcast.`,
      'Confirme que o pnpm dev em execução é o deste projeto.',
    )
  }
} catch {
  fail(
    `App não está rodando em ${baseUrl}.`,
    'Os testes e2e rodam contra o app em execução.',
    'Abra outra aba/terminal e rode:  pnpm dev',
  )
}
