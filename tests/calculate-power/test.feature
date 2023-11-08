Feature: Calculate power

    Scenario: Distance > reach
        When distance is greater than reach
        Then the power is 0

    Scenario: Reach > distance
        When reach is 19 and distance is 6.5
        Then the power is 156.25

    Scenario: Reach === distance
        When reach and distance are both 12
        Then there is an error for reach === distance

    Scenario: Reach is negative
        When reach is -15
        Then there is an error for reach < 0