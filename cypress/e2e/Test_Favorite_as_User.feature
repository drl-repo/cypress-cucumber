Feature: Check Favorite movie feature as User

  Rule: User should be logged in to do this test

    Background: User must be login to the app
      Given user should be logged in

    Scenario: Clear favorite movie list
      Given user clear favorite movie list

    Scenario: User can Mark movie as favorite
      Given user at home page
      When user view movie at number 1
      Then user should see detail movie page
      And user click Mark as Favorite button
      Then Mark as Favorite icon color is 'Pink'

    Scenario: List of Favorited movie should appears on user profile
      Given user at favorite movie page
      Then user should see the favorited movie

    Scenario: User can mark movie as favorite more than once
      Given user at home page
      When user view movie at number 3
      Then user should see detail movie page
      And user click Mark as Favorite button
      Then Mark as Favorite icon color is 'Pink'
      Given user at favorite movie page
      Then user should see the favorited movie

    Scenario: User remove Movie form favorite list
      Given user at favorite movie page
      And user remove favorited movie from their favorite list
      Then favorited movie should be removed from list
      