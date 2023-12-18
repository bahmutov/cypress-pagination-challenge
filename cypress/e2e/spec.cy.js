/// <reference types="cypress" />

import {recurse} from 'cypress-recurse'

beforeEach(() => {
  cy.visit('public/index.html')
})

it('find text in the paginated table', () => {
  // the text MUST BE in the table
  // otherwise this test fails
  recurse(
    () => cy.contains('tr:visible', 'Powlowski').should(Cypress._.noop),
    $el => $el.length,
    {
      delay: 1000,
      timeout: 10_000,
      log: 'Found text',
      post() {
        cy.get('[value=next]').click()
      }
    }
  )
})

// what if the text may not be there?
// Can you modify the above test to yield
// "textFound" boolean instead of failing?
it.only('look through the table for the text', () => {
  // go through the table while the Next button is enabled
  // check if there is a row with given text
  // DO NOT FAIL if the text is not found
  // just finished normally and print the following
  // using the cy.log command:
  // Found text? true|false
  //
  // Use "Powlowski" to find existent text
  // Use "Yundt" to find text on the very last page
  // Use "Joey" to search for the text that is not there
  recurse(
    () => {
      return cy.contains('tr:visible', 'Joey').should(Cypress._.noop)
      .then($el => {
        cy.get('[value=next]:enabled').should(Cypress._.noop).then($next => {
          return {
            textFound: $el.length > 0,
            tableFinished: $next.length === 0
          }
        })
      })
    },
    ({ textFound, tableFinished }) => textFound || tableFinished,
    {
      delay: 1000,
      timeout: 10_000,
      log: 'Looked through the table',
      post() {
        cy.get('[value=next]').click()
      }
    }
  ).then(({ textFound }) => {
    cy.log(`Found text? ${textFound}`)
  })
})
