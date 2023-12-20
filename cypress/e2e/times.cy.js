// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

it('collects all available times', () => {
  cy.visit('public/times.html')
  const availableTimes = []
  const timeSelectors = ['#morning', '#day', '#evening', '#night']
  // can you find the problem in the following test?
  // something is wrong leading to the flaky tests
  timeSelectors.forEach((timeButton) => {
    cy.get(timeButton).click()
    cy.get('#times .available')
      .should(Cypress._.noop)
      .map('innerText')
      .print('available %o')
      .then((times) => {
        availableTimes.push(...times)
      })
  })
  // confirm there are at least 3 available time slots
  // and that the first 3 values are
  // 13:00, 14:00, and 19:00
  cy.wrap(availableTimes)
    .should('have.length.greaterThan', 2)
    .invoke('slice', 0, 3)
    .should('deep.equal', ['13:00', '14:00', '19:00'])
})
