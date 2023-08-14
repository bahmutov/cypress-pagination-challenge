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
  cy.get('[value=next]') // keep clicking!

  cy.get('button.pagecontroller-num').each((_, index, $pages) => {
    if (index < $pages.length - 1) {
      cy.get('button[value="next"]').click()
    }
  })
  cy.get('button.pagecontroller-num').last().should('have.class', 'currentPage')

  cy.log('**confirm we are on the last page**')
  cy.get('[value=next]').should('be.disabled')
  cy.get('[value=last]').should('be.disabled')
})

it('clicks the Next button until we get to the last page', () => {
  // the HTML table on the page is paginated
  // can you click the "Next" button until
  // we get to the very last page?
  // button selector "[value=next]"
  cy.get('[value=next]') // keep clicking!

  cy.get('button.pagecontroller-num:not(.currentPage)').then(
    ($nonActivePageNumbers) => {
      Cypress._.each($nonActivePageNumbers, () => {
        cy.get('button[value="next"]').click()
      })
    },
  )
  cy.get('button.pagecontroller-num').last().should('have.class', 'currentPage')

  cy.log('**confirm we are on the last page**')
  cy.get('[value=next]').should('be.disabled')
  cy.get('[value=last]').should('be.disabled')
})

it('clicks the Next button until we get to the last page', () => {
  // the HTML table on the page is paginated
  // can you click the "Next" button until
  // we get to the very last page?
  // button selector "[value=next]"
  cy.get('[value=next]') // keep clicking!

  cy.get('button.pagecontroller-num:not(.currentPage)').then(
    ($nonActivePageNumbers) => {
      Cypress._.times($nonActivePageNumbers.length, () => {
        cy.get('button[value="next"]').click()
      })
    },
  )
  cy.get('button.pagecontroller-num').last().should('have.class', 'currentPage')

  cy.log('**confirm we are on the last page**')
  cy.get('[value=next]').should('be.disabled')
  cy.get('[value=last]').should('be.disabled')
})

it('clicks the Next button until we get to the last page', () => {
  // the HTML table on the page is paginated
  // can you click the "Next" button until
  // we get to the very last page?
  // button selector "[value=next]"
  // cy.get('[value=next]') // keep clicking!

  let startPageNumber = 0
  const moveNextPage = (pageNumber) => {
    cy.get('button.pagecontroller-num:not(.currentPage)').then(
      ($nonActivePageNumbers) => {
        if (pageNumber === $nonActivePageNumbers.length) {
          cy.log(`**🛑Reached the end at index: ${pageNumber}🛑**`)
          return
        } else {
          cy.get('[value=next]').click()
          moveNextPage(++pageNumber)
        }
      },
    )
  }
  moveNextPage(startPageNumber)
  cy.get('button.pagecontroller-num').last().should('have.class', 'currentPage')

  cy.log('**confirm we are on the last page**')
  cy.get('[value=next]').should('be.disabled')
  cy.get('[value=last]').should('be.disabled')
})
