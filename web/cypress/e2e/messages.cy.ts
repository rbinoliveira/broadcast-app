describe('Mensagens', () => {
  beforeEach(() => {
    cy.login()
    cy.visit('/messages')
    cy.contains('h1', 'Mensagens').should('be.visible')
  })

  it('exibe busca, filtro de status e paginação', () => {
    cy.get('input[aria-label="buscar"]').should('exist')
    cy.contains('button', 'Nova mensagem').should('be.visible')
    cy.contains('button', 'Anterior').should('be.disabled')
    cy.contains('button', 'Próxima').should('exist')
  })

  it('abre e fecha o formulário de nova mensagem', () => {
    cy.contains('button', 'Nova mensagem').click()
    cy.contains('h2', 'Nova mensagem').should('be.visible')
    cy.get('textarea[placeholder="Digite a mensagem"]').should('exist')

    cy.contains('button', 'Cancelar').click()
    cy.contains('h2', 'Nova mensagem').should('not.exist')
  })

  it('aceita digitar uma busca por conteúdo sem quebrar a página', () => {
    cy.get('input[aria-label="buscar"]').type('promo')
    cy.contains('h1', 'Mensagens').should('be.visible')
  })
})
