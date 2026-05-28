describe('Dashboard e navegação', () => {
  beforeEach(() => {
    cy.login()
  })

  it('mostra os cartões de estatísticas', () => {
    cy.visit('/')

    cy.contains('h1', 'Dashboard').should('be.visible')
    cy.contains('Conexões').should('be.visible')
    cy.contains('Contatos').should('be.visible')
    cy.contains('Mensagens enviadas').should('be.visible')
    cy.contains('Mensagens agendadas').should('be.visible')
  })

  it('navega entre as páginas pela sidebar', () => {
    cy.visit('/')

    cy.get('aside').contains('Conexões').click()
    cy.location('pathname').should('eq', '/connections')

    cy.get('aside').contains('Contatos').click()
    cy.location('pathname').should('eq', '/contacts')

    cy.get('aside').contains('Mensagens').click()
    cy.location('pathname').should('eq', '/messages')
  })
})
