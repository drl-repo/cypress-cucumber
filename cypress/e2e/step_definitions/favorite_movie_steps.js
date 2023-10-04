import { 
  Given,
  When,
  Then,
  And 
} from "cypress-cucumber-preprocessor/steps";

Given('user at favorite movie page', () => {
  cy.visit('/u/'+Cypress.env('username')+'/favorites')
})

Then('user should see the favorited movie', function(){
  cy.log(this.favoritedMovie)

  cy.get('.content .items_wrapper')
    .should('contain', this.favoritedMovie)
})

When(/^user sort by (\w+\s\w+)( asc)?/, (sortBy, sortDirection='desc') => {
  cy.get('#account_scroll').scrollIntoView()
  cy.get('.content .items_wrapper')
    .then((el)=>{
      if(el.find('.card').length > 1){
        cy.get('header').invoke('hide')
        cy.get('.sort_filter .filters').realHover()
        cy.get('ul.filters')
          .should('be.visible')
          .then((el)=>{
            const sortOption = {
                //'Date Added'    : '#filter_by_created_at', //defaul sort
                'Popularity'    : '#filter_by_popularity',
                'Released Date' : '#filter_by_release_date'
              }

            if(sortOption.hasOwnProperty(sortBy)){
              cy.log('Sort by '+sortBy+' '+sortDirection)
              cy.wrap(el)
                .find(sortOption[sortBy])
                .click({ scrollBehavior: false })
              
              if(sortDirection.trim()=='asc'){
                cy.get('.order_filter .sort .selected')
                  .click({ scrollBehavior: false })
              }

            }
          })
      }else{
        cy.log('Not Enought list to do test !')
      }
    })    
})

And('user remove favorited movie from their favorite list', function(){
  cy.get('.content .items_wrapper')
    .contains(this.favoritedMovie)
    .parents('.details')
    .find('.action_bar .remove_list_item')
    .eq(1).click()
})

And('favorited movie should be removed from list', function(){
  cy.get('.content .items_wrapper')
    .should('not.contain', this.favoritedMovie)
})

Then(/^list favorite movie should be sorted by (\w+\s\w+)( asc)?/, (sortBy, sortDirection='desc') => {

  cy.get('.content .items_wrapper')
    .then((el)=>{
    if(el.find('.card').length > 1){
            
      const sortItemWrapper = {
        //'Date Added'    : '', //nanti kita isi kalau sudah ad info dr devnya :)
        //'Popularity'    : '',
        'Released Date' : '.release_date'
      }

      if(sortItemWrapper.hasOwnProperty(sortBy)){
          cy.wrap(el)
            .find(sortItemWrapper[sortBy])
            .should(function(elements){
              //get all data
              const arrDateReleased = Cypress._.map(elements, function(elOfDateReleased){
                return elOfDateReleased.innerText
              }).map(function(el){
                return new Date(el)
              })

              //sort and compare
              let sorted = Cypress._.sortBy(arrDateReleased)
              if(sortDirection.trim()=='desc'){
                sorted = sorted.reverse()
              }
              expect(arrDateReleased).to.deep.equal(sorted)
            })
        }

    }else{
      cy.log('Not Enought list to do test !')
    }
    
    })
})