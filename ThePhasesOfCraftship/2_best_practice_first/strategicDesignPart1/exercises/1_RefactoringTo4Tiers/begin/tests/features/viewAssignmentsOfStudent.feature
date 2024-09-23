Feature: View Submitted Assignments Of Student

    As a student
    I want to be able to view all submitted assignments for a class
    So I can see what assignments I submitted to that class

    Scenario: Successfully view all submitted assignments of a student
        Given I have a student with submitted student assignments
        When I try to view all submitted assignments of the student
        Then I should get a list of their submitted assignments

    Scenario: View submitted assignments of a non-existent student
        When I try to view all submitted assignments of a non-existent student
        Then I should get a student not found error

    Scenario: View submitted assignments of a student with invalid student id
        When I try to view all submitted assignments of a student by providing an invalid student ID
        Then I should get a validation error
