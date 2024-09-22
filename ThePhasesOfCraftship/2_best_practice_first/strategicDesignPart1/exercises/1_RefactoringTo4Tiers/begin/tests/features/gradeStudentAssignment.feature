Feature: Grade Student Assignment

    As a teacher
    I want to grade a student assignment
    So that I can give the students feedback

    Background:
        Given I have a submitted student assignment

    Scenario: Successfully grade a student assignment
        When I send a request to grade the student assignment
        Then the student assignment should be graded successfully

    Scenario: Fail to grade a non-existent student assignment
        When I send a request to grade a non-existent student assignment
        Then the request should return an assignment not found error

    Scenario: Fail to grade a student assignment with missing student assignment ID
        When I send a request to grade a student assignment with missing student assignment ID
        Then the request should return a validation error

    Scenario: Fail to grade a student assignment with invalid grade
        When I send a request to grade a student assignment with invalid grade
        Then the request should return a validation error