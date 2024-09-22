Feature: View Student

    As a teacher
    I want to be able to view a single student
    So I can see their details and assignments

    Scenario: Successfully view a student
        Given I have a student
        When I try to view the student
        Then I should get the student details and assignments

    Scenario: View a non-existent student
        When I try to view a non-existent student
        Then I should get a student not found error

    Scenario: View student with invalid id
        When I try to view a student by providing an invalid student ID
        Then I should get a validation error