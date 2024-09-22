Feature: View Assignments For Class

    As a teacher
    I want to be able to view all assignments for a class
    So I can see what assignments are assigned to my class

    Scenario: Successfully view all assignments for a class
        Given I have assignments for a class
        When I send a request to view all assignments for a class
        Then the request should return a list of assignments

    Scenario: View assignments for a non-existent class
        When I send a request to view all assignments for a non-existent class
        Then the request should return a class not found error

    Scenario: View assignments for a class with invalid class id
        When I send a request to view all assignments for a class with an invalid class id
        Then the request should return a validation error

