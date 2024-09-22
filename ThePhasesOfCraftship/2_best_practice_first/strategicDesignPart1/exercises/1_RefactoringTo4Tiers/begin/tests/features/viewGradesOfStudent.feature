Feature: View Grades Of Student

    As a student
    I want to be able to view all my grades
    So I can see where I stand

    Scenario: Successfully view all grades of a student
        Given I have a student with graded student assignments
        When I send a request to view all grades of a student
        Then the request should return the list of the student's graded assignments

    Scenario: View grades of a non-existent student
        When I send a request to view all grades of a non-existent student
        Then the request should return a student not found error

    Scenario: View grades of a student with invalid student id
        When I send a request to view all grades of a student with an invalid student id
        Then the request should return a validation error