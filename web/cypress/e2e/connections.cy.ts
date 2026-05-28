describe('Conexões', () => {
  const name = `E2E Conexão ${Date.now()}`
  const renamed = `${name} editada`

  beforeEach(() => {
    cy.login()
  })

  it('cria, edita e remove uma conexão', () => {
    cy.visit('/connections')

    cy.get('[aria-label="Nova conexão"]').click()
    cy.get('input[placeholder="Ex: WhatsApp Vendas"]').type(name)
    cy.contains('button', 'Salvar').click()
    cy.contains('h2', 'Nova conexão').should('not.exist')
    cy.get('main').contains(name, { timeout: 15000 }).should('be.visible')

    cy.get(`[aria-label="Editar ${name}"]`).click({ force: true })
    cy.contains('h2', 'Editar conexão').should('be.visible')
    cy.get('input[placeholder="Ex: WhatsApp Vendas"]').should('have.value', name)
    cy.get('input[placeholder="Ex: WhatsApp Vendas"]').clear().type(renamed)
    cy.contains('button', 'Salvar').click()
    cy.contains('h2', 'Editar conexão').should('not.exist')
    cy.get('main').contains(renamed, { timeout: 15000 }).should('be.visible')

    cy.get(`[aria-label="Excluir ${renamed}"]`).click({ force: true })
    cy.get('main').contains(renamed).should('not.exist')
  })
})
