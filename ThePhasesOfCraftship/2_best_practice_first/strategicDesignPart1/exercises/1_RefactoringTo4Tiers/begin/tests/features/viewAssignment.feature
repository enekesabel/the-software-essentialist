Feature: View Assignment

    As a teacher
    I want to be able to view a single assignment
    So I can see its details and students

    Scenario: Successfully view an assignment
        Given I have an assignment
        When I send a request to view the assignment
        Then the request should return the assignment details and students

    Scenario: View a non-existent assignment
        When I send a request to view a non-existent assignment
        Then the request should return 404

    Scenario: View assignment with invalid id
        When I send a request to view an assignment with invalid id
        Then the request should return a validation error
