Feature: Create Assignment

    As a teacher
    I want to create an assignment
    So that I can assign it to a class

    Scenario: Successfully create an assignment
        Given a class named "Math" exists
        And I want to create an assignment with title "Math Quiz"
        When I try to create the assignment
        Then the assignment should be created successfully

    Scenario: Fail to create an assignment with no title
        Given a class named "Math" exists
        And I want to create an assignment with no title
        When I try to create the assignment
        Then I should get a validation error

    Scenario: Fail to create an assignment with no class id
        Given I want to create an assignment with title "Math Quiz"
        When I try to create an assignment without providing a class ID
        Then I should get a validation error