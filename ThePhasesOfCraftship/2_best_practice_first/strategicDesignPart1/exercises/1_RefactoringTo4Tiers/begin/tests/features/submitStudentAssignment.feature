Feature: Submit Student Assignment

    As a student
    I want to be able to submit my assignments
    So my teachers can grade them

    Background:
        Given I have a student assignment

    Scenario: Successfully submit a student assignment
        When I try to submit the student assignment
        Then the student assignment should be submitted successfully

    Scenario: Fail to submit a non-existent student assignment
        When I try to submit a non-existent student assignment
        Then I should get an assignment not found error

    Scenario: Fail to submit a student assignment with missing student assignment ID
        When I try to submit a student assignment without providing a student assignment ID
        Then I should get a validation error

