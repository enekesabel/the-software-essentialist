import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { AssignmentBuilder, ClassRoomBuilder, resetDatabase, StudentAssignmentBuilder, StudentBuilder } from "../fixtures";
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
            student = await new StudentBuilder().withName('John Doe').build();
            const classRoom = await new ClassRoomBuilder().withName('Math Class').build();
            const algebraAssignment = await new AssignmentBuilder().withTitle('Algebra Assignment').andClassRoom(classRoom).build();
            const geometryAssignment = await new AssignmentBuilder().withTitle('Geometry Assignment').andClassRoom(classRoom).build();
            studentAssignments[0] = await new StudentAssignmentBuilder().withAssingment(algebraAssignment).withStudent(student).withStatus('submitted').build();
            studentAssignments[1] = await new StudentAssignmentBuilder().withAssingment(geometryAssignment).withStudent(student).build();
        });

        when('I send a request to view all submitted assignments of a student', async () => {
            response = await request(app).get(`/student/${student.id}/assignments`);
        });

        then('the request should return a list of submitted assignments', () => {
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(1);
            expect(response.body.data[0]).toHaveProperty('id', studentAssignments[0].id);
        });
    });

    test('View submitted assignments of a non-existent student', ({ when, then }) => {
        let response: supertest.Response;
        const nonExistentStudentId = 'bf00589d-0af7-449e-8378-c43ed754d1f3'

        when('I send a request to view all submitted assignments of a non-existent student', async () => {
            response = await request(app).get(`/student/${nonExistentStudentId}/assignments`);
        });

        then('the request should return a student not found error', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.StudentNotFound);
        });
    });

    test('View submitted assignments of a student with invalid student id', ({ when, then }) => {
        let response: supertest.Response;
        const invalidStudentId = 'invalid-student-id'

        when('I send a request to view all submitted assignments of a student with an invalid student id', async () => {
            response = await request(app).get(`/student/${invalidStudentId}/assignments`);
        });

        then('the request should return a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});
