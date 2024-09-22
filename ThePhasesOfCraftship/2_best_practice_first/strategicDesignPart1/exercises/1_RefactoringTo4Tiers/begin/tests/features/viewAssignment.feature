Feature: View Assignment

    As a teacher
    I want to be able to view a single assignment
    So I can see its details and the students assigned to it

    Scenario: Successfully view an assignment
        Given I have an assignment
        When I try to view the assignment
        Then I should get the assignment

    Scenario: View a non-existent assignment
        When I try to view a non-existent assignment
        Then I should get an assignment not found error

    Scenario: View assignment with invalid id
        When I try to view an assignment with an invalid ID
        Then I should get a validation error
