Feature: View Grades Of Student

    As a student
    I want to be able to view all my grades
    So I can see where I stand with my studies

    Scenario: Successfully view all grades of a student
        Given I have a student with graded student assignments
        When I try to view all grades of the student
        Then I should get a list of their graded assignments

    Scenario: View grades of a non-existent student
        When I try to view all grades of a non-existent student
        Then I should get a student not found error

    Scenario: View grades of a student with invalid student id
        When I try to view all grades of a student by providing an invalid student ID
        Then I should get a validation error