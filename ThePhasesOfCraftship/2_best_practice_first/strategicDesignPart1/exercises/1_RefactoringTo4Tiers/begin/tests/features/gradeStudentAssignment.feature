Feature: Grade Student Assignment

    As a teacher
    I want to grade a student assignment
    So that I can give the students feedback

    Background:
        Given I have a submitted student assignment

    Scenario: Successfully grade a student assignment
        When I try to grade the student assignment
        Then the student assignment should be graded successfully

    Scenario: Fail to grade a non-existent student assignment
        When I try to grade a non-existent student assignment
        Then I should get an assignment not found error

    Scenario: Fail to grade a student assignment with missing student assignment ID
        When I try to grade a student assignment without providing a student assignment ID
        Then I should get a validation error

    Scenario: Fail to grade a student assignment with invalid grade
        When I try to grade a student assignment with an invalid grade
        Then I should get a validation error