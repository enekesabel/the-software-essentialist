Feature: View Submitted Assignments Of Student

    As a student
    I want to be able to view all submitted assignments for a class
    So I can see what assignments are assigned to me

    Scenario: Successfully view all submitted assignments of a student
        Given I have a student with submitted student assignments
        When I send a request to view all submitted assignments of a student
        Then the request should return a list of submitted assignments

    Scenario: View submitted assignments of a non-existent student
        When I send a request to view all submitted assignments of a non-existent student
        Then the request should return a student not found error

    Scenario: View submitted assignments of a student with invalid student id
        When I send a request to view all submitted assignments of a student with an invalid student id
        Then the request should return a validation error
