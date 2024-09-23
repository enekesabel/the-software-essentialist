import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase, StudentAssignmentBuilder, StudentBuilder } from "../fixtures";
import { StudentAssignment, Student } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/viewAssignmentsOfStudent.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    let studentAssignments: StudentAssignment[] = [];
    let student: Student;

    test('Successfully view all submitted assignments of a student', ({ when, then, given }) => {
        let response: supertest.Response;

        given('I have a student with submitted student assignments', async() => {
            student = await StudentBuilder.Fake().build();
            
            studentAssignments[0] = await StudentAssignmentBuilder.Fake().andStudent(student).withStatus('submitted').build();
            studentAssignments[1] = await StudentAssignmentBuilder.Fake().andStudent(student).withStatus('submitted').build();
            studentAssignments[2] = await StudentAssignmentBuilder.Fake().andStudent(student).build();
        });

        when('I try to view all submitted assignments of the student', async () => {
            response = await request(app).get(`/student/${student.id}/assignments`);
        });

        then('I should get a list of their submitted assignments', () => {
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(2);
            expect(response.body.data[0]).toHaveProperty('id', studentAssignments[0].id);
            expect(response.body.data[1]).toHaveProperty('id', studentAssignments[1].id);
        });
    });

    test('View submitted assignments of a non-existent student', ({ when, then }) => {
        let response: supertest.Response;
        const nonExistentStudentId = 'bf00589d-0af7-449e-8378-c43ed754d1f3'

        when('I try to view all submitted assignments of a non-existent student', async () => {
            response = await request(app).get(`/student/${nonExistentStudentId}/assignments`);
        });

        then('I should get a student not found error', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.StudentNotFound);
        });
    });

    test('View submitted assignments of a student with invalid student id', ({ when, then }) => {
        let response: supertest.Response;
        const invalidStudentId = 'invalid-student-id'

        when('I try to view all submitted assignments of a student by providing an invalid student ID', async () => {
            response = await request(app).get(`/student/${invalidStudentId}/assignments`);
        });

        then('I should get a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});
