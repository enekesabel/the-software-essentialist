Feature: View Student

    As a teacher
    I want to be able to view a single student
    So I can see their details and assignments

    Scenario: Successfully view a student
        Given I have a student
        When I send a request to view the student
        Then the request should return the student details and assignments

    Scenario: View a non-existent student
        When I send a request to view a non-existent student
        Then the request should return 404

    Scenario: View student with invalid id
        When I send a request to view a student with invalid id
        Then the request should return a validation error