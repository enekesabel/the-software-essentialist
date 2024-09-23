Feature: View Assignments For Class

    As a teacher
    I want to be able to view all assignments for a class
    So I can see what assignments are create for my my class

    Scenario: Successfully view all assignments for a class
        Given I have assignments for a class
        When I try to view all assignments for a class
        Then I should get the list of assignments for the class

    Scenario: View assignments for a non-existent class
        When I try to view all assignments for a non-existent class
        Then I should get a class not found error

    Scenario: View assignments for a class with invalid class id
        When I try to view all assignments for a class by providing an invalid class ID
        Then I should get a validation error

