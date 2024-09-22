Feature: View All Students

    As a teacher
    I want to be able to view all students
    So I can see who is in my class

    Background:
        Given I have students

    Scenario: Successfully view all students
        When I send a request to view all students
        Then the request should return a list of students
