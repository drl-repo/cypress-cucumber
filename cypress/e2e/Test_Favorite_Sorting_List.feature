Feature: Shorting list favorite movie

  Rule: User should be logged in to do this test

    Background: User must be login to the app
      Given user should be logged in

    Scenario Outline: Add more movie to favorites list to do sorting test
      Given user at home page
      When user view movie at number <number>
      Then user should see detail movie page
      And user click Mark as Favorite button
      Then Mark as Favorite icon color is 'Pink'

      Examples:
        | number|
        |    5  |
        |    7  |

    Scenario: User can sorting their favorited Movie by released date desc (default)
      Given user at favorite movie page
      When user sort by Released Date
      Then list favorite movie should be sorted by Released Date

    Scenario: User can sorting their favorited Movie by released date asc
      Given user at favorite movie page
      When user sort by Released Date asc
      Then list favorite movie should be sorted by Released Date asc

   
