// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />
import { recurse } from 'cypress-recurse'

beforeEach(() => {
  cy.visit('public/index.html')
})

it('clicks the Next button until we get to the last page', () => {
  // the HTML table on the page is paginated
  // can you click the "Next" button until
  // we get to the very last page?
  // button selector "[value=next]"

  // doing it like this, so that we only write the selector once!
  cy.get('[value=next]').then(($button) => {
    recurse(
      () => cy.wrap($button, { log: false }),
      ($button) => $button.attr('disabled') === 'disabled',
      {
        post: () => {
          // won't click if the button is disabled in the first place!
          cy.wrap($button, { log: false }).click()
        },
        log: false,
      },
    ).should('be.disabled')
  })

  cy.log('**confirm we are on the last page**')
  cy.get('[value=last]').should('be.disabled')
})
