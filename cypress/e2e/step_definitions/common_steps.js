import { 
  Given,
  When,
  Then,
  And 
} from "cypress-cucumber-preprocessor/steps";

const username = Cypress.env('username')
const password = Cypress.env('password')

Given('user should be logged in', () => {
  cy.login(username, password)
})

Given('user clear favorite movie list', () => {
  cy.visit('/u/'+username+'/favorites')
  cy.get('.content .items_wrapper')
    .then(function(el){
      //clear if exist
      if(el.find('.card').length > 0){
        cy.wrap(el)
          .find('.action_bar')
          .each(function(item){
            cy.wrap(item).find('li').eq(3).click()
          })
      }
    })
})


