Feature: Assign Student to Assignment

    As a teacher
    I want to assign students to assignments
    So I can grade them

    Background:
        Given I have a student
        And I have an assignment

    Scenario: Successfully assign a student to an assignment
        When I assign the student to the assignment
        Then the student should be assigned to the assignment successfully

    Scenario: Fail to assign a non-existent student to an assignment
        When I try to assign a non-existent student to an assignment
        Then I should get a student not found error

    Scenario: Fail to assign a student to a non-existent assignment
        When I try to assign a student to a non-existent assignment
        Then I should get an assignment not found error

    Scenario: Fail to assign a student to an assignment with missing student ID
        When I try to assign a student to an assignment without providing a student ID
        Then I should get a validation error

    Scenario: Fail to assign a student to an assignment with missing assignment ID
        When I try to assign a student to an assignment without providing an assignment ID
        Then I should get a validation error