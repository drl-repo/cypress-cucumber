Feature: Check Favorite movie feature as Guest

  Rule: User should NOT logged in

    Scenario: User cant mark movie as favorite without login
        Given user at home page
        When user view movie at number 1
        Then user should see detail movie page
        And user click Mark as Favorite button
        Then Mark as Favorite icon color is 'Not Pink'
        And Mark as Favorite button should show tooltip 'Login to add this movie to your favorite list'