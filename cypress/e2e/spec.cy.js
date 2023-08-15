// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

const nextBtn = '[value=next]'
const lastBtn = '[value=last]'

beforeEach(() => {
  cy.visit('public/index.html')
})

it('clicks the Next button until we get to the last page', async () => {
  // the HTML table on the page is paginated
  // can you click the "Next" button until
  // we get to the very last page?
  // button selector "[value=next]"

  cy.get(nextBtn)
    .should('exist')
    .then($button => {
      function clickNext () {
        cy.get(nextBtn).then($button => {
          if ($button.attr('disabled')) {
            cy.log('Button is disabled, pagination finished!')
          } else {
            cy.log('Clicking the "Next" button...')
            cy.get(nextBtn).click().should('exist')
            clickNext()
          }
        })
      }

      clickNext()
    })

  cy.log('**confirm we are on the last page**')
  cy.get(nextBtn).should('be.disabled')
  cy.get(lastBtn).should('be.disabled')
})
