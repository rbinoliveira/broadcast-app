describe('Contatos', () => {
  const connectionName = `E2E Contatos ${Date.now()}`
  const contactName = `Maria E2E ${Date.now()}`

  beforeEach(() => {
    cy.login()
  })

  it('cria, busca e remove um contato dentro de uma conexão', () => {
    cy.visit('/connections')
    cy.get('[aria-label="Nova conexão"]').click()
    cy.get('input[placeholder="Ex: WhatsApp Vendas"]').type(connectionName)
    cy.contains('button', 'Salvar').click()
    cy.get('main').contains(connectionName, { timeout: 15000 }).click()

    cy.location('pathname').should('eq', '/contacts')

    cy.contains('button', 'Novo contato').click()
    cy.get('input[placeholder="Ex: Maria Silva"]').type(contactName)
    cy.get('input[placeholder="Ex: (85) 99999-9999"]').type('85999998888')
    cy.contains('button', 'Salvar').click()
    cy.contains(contactName, { timeout: 15000 }).should('be.visible')

    cy.get('input[aria-label="buscar"]').type(contactName)
    cy.contains(contactName).should('be.visible')

    cy.get(`[aria-label="Excluir ${contactName}"]`).click({ force: true })
    cy.contains(contactName).should('not.exist')

    cy.visit('/connections')
    cy.get(`[aria-label="Excluir ${connectionName}"]`).click({ force: true })
  })
})
