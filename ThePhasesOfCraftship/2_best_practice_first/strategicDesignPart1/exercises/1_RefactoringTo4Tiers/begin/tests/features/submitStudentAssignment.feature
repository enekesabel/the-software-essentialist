Feature: Submit Student Assignment

    Background:
        Given I have a student assignment

    Scenario: Successfully submit a student assignment
        When I send a request to submit the student assignment
        Then the student assignment should be submitted successfully

    Scenario: Fail to submit a non-existent student assignment
        When I send a request to submit a non-existent student assignment
        Then the request should return an assignment not found error

    Scenario: Fail to submit a student assignment with missing student assignment ID
        When I send a request to submit a student assignment with missing student assignment ID
        Then the request should return a validation error

