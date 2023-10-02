// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

import { recurse } from 'cypress-recurse'

beforeEach(() => {
  cy.visit('public/index.html')
})

it('finds the text in the paginated table', () => {
  // the paginated table has a row that includes this text
  const text = 'Harvey'
  // iterate over the table's pages
  // until you either see the text or reach the end
  // throw an error if the text was not found
})
