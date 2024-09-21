Feature: Enroll Student in Class

    As an administrator
    I want to enroll a student in a class
    So that I can manage student-class relationships

    Scenario: Successfully enroll a student in a class
        Given I have a student with name "John Doe"
        And I have a class with name "Math 101"
        When I send a request to enroll the student in the class
        Then the student should be enrolled in the class successfully

    Scenario: Fail to enroll a student in a class with missing student ID
        Given I have a class with name "Math 101"
        When I send a request to enroll a student in the class with missing student ID
        Then the request should return a validation error

    Scenario: Fail to enroll a student in a class with missing class ID
        Given I have a student with name "John Doe"
        When I send a request to enroll the student in a class with missing class ID
        Then the request should return a validation error

    Scenario: Fail to enroll a student in a class with non-existent student
        Given I have a class with name "Math 101"
        When I send a request to enroll a non-existent student in the class
        Then the request should return a student not found error

    Scenario: Fail to enroll a student in a class with non-existent class
        Given I have a student with name "John Doe"
        When I send a request to enroll the student in a non-existent class
        Then the request should return a class not found error