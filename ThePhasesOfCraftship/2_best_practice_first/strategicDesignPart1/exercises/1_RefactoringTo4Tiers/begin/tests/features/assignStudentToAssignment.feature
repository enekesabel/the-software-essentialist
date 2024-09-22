Feature: Assign Student to Assignment

    As a teacher
    I want to assign students to assignments
    So I can grade them

    Background:
        Given I have a student
        And I have an assignment

    Scenario: Successfully assign a student to an assignment
        When I send a request to assign the student to the assignment
        Then the student should be assigned to the assignment successfully

    Scenario: Fail to assign a non-existent student to an assignment
        When I send a request to assign a non-existent student to the assignment
        Then the request should return a student not found error

    Scenario: Fail to assign a student to a non-existent assignment
        When I send a request to assign the student to a non-existent assignment
        Then the request should return an assignment not found error

    Scenario: Fail to assign a student to an assignment with missing student ID
        When I send a request to assign a student to the assignment with missing student ID
        Then the request should return a validation error

    Scenario: Fail to assign a student to an assignment with missing assignment ID
        When I send a request to assign the student to an assignment with missing assignment ID
        Then the request should return a validation error