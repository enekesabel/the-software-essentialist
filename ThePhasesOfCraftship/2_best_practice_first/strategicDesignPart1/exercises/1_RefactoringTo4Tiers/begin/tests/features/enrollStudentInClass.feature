Feature: Enroll Student in Class

    As an administrator
    I want to enroll a student in a class
    So that I can manage students in classes

    Scenario: Successfully enroll a student in a class
        Given I have a student with name "John Doe"
        And I have a class with name "Math 101"
        When I try to enroll the student in the class
        Then the student should be enrolled in the class successfully

    Scenario: Fail to enroll a student in a class with missing student ID
        Given I have a class with name "Math 101"
        When I try to enroll the student in the class without providing a student ID
        Then I should get a validation error

    Scenario: Fail to enroll a student in a class with missing class ID
        Given I have a student with name "John Doe"
        When I try to enroll the student in the class without providing a class ID
        Then I should get a validation error

    Scenario: Fail to enroll a student in a class with non-existent student
        Given I have a class with name "Math 101"
        When I try to enroll a student with non-existent student ID in the class
        Then I should get a student not found error

    Scenario: Fail to enroll a student in a class with non-existent class
        Given I have a student with name "John Doe"
        When I try to enroll the student in a non-existent class
        Then I should get a class not found error