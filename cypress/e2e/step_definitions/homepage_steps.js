import { 
  Given,
  When,
  Then,
  And 
} from "cypress-cucumber-preprocessor/steps";

Given('user at home page', () => {
  cy.visit('/')
})

When('user view movie at number {int}', (number) => {
  //verify to wait until loaded
  cy.get('#trending_scroller .column_content')
    .scrollIntoView()
    .invoke('attr','class')
    .should('include','loaded')
  
  //ada movie, ada tv kita pilih movie only
  cy.get('#trending_scroller .column_content .card')
    .find('h2 a')
    .filter('[href^="/movie/"]')
    .eq(number-1).click()
  cy.wait(500) //just wait reload page
})