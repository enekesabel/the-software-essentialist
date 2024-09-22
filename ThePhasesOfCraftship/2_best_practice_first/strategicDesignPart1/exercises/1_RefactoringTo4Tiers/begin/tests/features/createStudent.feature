Feature: Create Student

    As an administrator
    I want to create a student
    So that I can add them to a class

    Scenario: Successfully create a student
        Given I want to create a student with name "John Doe"
        When I try to create the student
        Then the student should be created successfully

    Scenario: Fail to create a student with no name
        Given I want to create a student with no name
        When I try to create the student
        Then I should get a validation error
