Feature: Get distance between two points

    Scenario: coordinates contain negative number and float
        When coordinates contain negative number and float: [-5, 1.5], [2, 3]
        Then the distance should be 7.158910531638177

    Scenario: one 0 in coordinates
        When coordinates contain a zero: [-5, 4], [2, 0]
        Then the distance should be 8.06225774829855