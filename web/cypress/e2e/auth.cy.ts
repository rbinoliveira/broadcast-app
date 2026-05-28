describe('Autenticação', () => {
  it('redireciona para o login ao acessar uma rota protegida sem sessão', () => {
    cy.visit('/messages')
    cy.location('pathname', { timeout: 15000 }).should('eq', '/login')
  })

  it('mostra erro de validação para e-mail inválido', () => {
    cy.visit('/login')
    cy.get('#email').type('email-invalido')
    cy.contains('button', 'Entrar').click()

    cy.get('.MuiFormHelperText-root.Mui-error').should('be.visible')
    cy.location('pathname').should('eq', '/login')
  })

  it('entra com e-mail e senha e depois faz logout', () => {
    cy.login()
    cy.visit('/')
    cy.contains('h1', 'Dashboard').should('be.visible')

    cy.get('aside').find('[aria-label="Abrir menu"]').click()
    cy.contains('Sair').click()

    cy.location('pathname', { timeout: 15000 }).should('eq', '/login')
  })
})
