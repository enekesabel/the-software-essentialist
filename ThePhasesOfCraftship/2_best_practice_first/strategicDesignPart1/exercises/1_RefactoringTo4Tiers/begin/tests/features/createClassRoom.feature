Feature: Create Class Room

    As an administrator
    I want to create a class
    So that I can add students to it

    Scenario: Sucessfully create a class room
        Given I want to create a class room named "Math"
        When I try to create the class room
        Then the class room should be created successfully

    Scenario: Fail to create a class room with no name
        Given I want to create a class room with no name
        When I try to create the class room
        Then I should get a validation error

    Scenario: Fail to create a class room with the same name
        Given A class room named "Math" already exists
        And I want to create a class room with the same name
        When I try to create the class room
        Then I should get an error