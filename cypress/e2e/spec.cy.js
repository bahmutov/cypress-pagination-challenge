// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('public/index.html')
})

it('clicks the Next button until we get to the last page', () => {
  // the HTML table on the page is paginated
  // can you click the "Next" button until
  // we get to the very last page?
  // button selector "[value=next]"

  cy.get('.pagecontroller.pagecontroller-num')
    .should('have.length.above', 0)
    .each((_, index, $pages) => {
      if (index !== $pages.length - 1) cy.get('[value=next]').click()
    })

  cy.log('**confirm we are on the last page**')
  cy.get('[value=next]').should('be.disabled')
  cy.get('[value=last]').should('be.disabled')
})
