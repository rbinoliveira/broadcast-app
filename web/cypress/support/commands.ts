const email = Cypress.env('email') as string | undefined
const password = Cypress.env('password') as string | undefined

Cypress.Commands.add('login', () => {
  if (!email || !password) {
    throw new Error(
      'Credenciais de teste ausentes. Crie um cypress.env.json com "email" e "password" (veja cypress.env.example.json).',
    )
  }

  cy.session([email, password], () => {
    cy.visit('/login')
    cy.get('#email').type(email)
    cy.get('#password').type(password, { log: false })
    cy.contains('button', 'Entrar').click()
    cy.location('pathname', { timeout: 15000 }).should('eq', '/')
  })
})

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>
    }
  }
}

export {}
