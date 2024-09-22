Feature: View All Students

    As a teacher
    I want to be able to view all students
    So I can see who attends the university

    Background:
        Given I have students

    Scenario: Successfully view all students
        When I try to view all students
        Then I should get the full list of students
