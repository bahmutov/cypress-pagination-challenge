// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

// https://github.com/bahmutov/cypress-map
import 'cypress-map'

it('collects all available times', () => {
  cy.visit('public/times.html')
  const availableTimes = []
  const timeSelectors = ['#morning', '#day', '#evening', '#night']
  // click on each time selector button
  // and grab the available times elements
  // Note: there might be no available times!
  // collect all time slots as text in the "availableTimes" array
  //
  // confirm there are at least 3 available time slots
  // and that the first 3 values are
  // 13:00, 14:00, and 19:00
})
