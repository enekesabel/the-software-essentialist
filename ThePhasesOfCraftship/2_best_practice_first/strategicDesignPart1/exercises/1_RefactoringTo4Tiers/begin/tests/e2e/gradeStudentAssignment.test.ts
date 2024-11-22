import { defineFeature, DefineStepFunction, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase, StudentAssignmentBuilder } from "../fixtures";
import { StudentAssignment } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/gradeStudentAssignment.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    let studentAssignment: StudentAssignment;

    const givenIHaveAStudentAssignment = ({given}:{given: DefineStepFunction}) => {
        given('I have a submitted student assignment', async() => {
            studentAssignment = await StudentAssignmentBuilder.Fake().withStatus('submitted').build();
        });
    }

    test('Successfully grade a student assignment', ({ when, then, given }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStudentAssignment({given});

        when('I try to grade the student assignment', async () => {
            requestBody = { id: studentAssignment.id, grade: "A" };
            response = await request(app).post("/student-assignments/grade").send(requestBody);
        });

        then('the student assignment should be graded successfully', () => {
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("studentId", studentAssignment.studentId);
            expect(response.body.data).toHaveProperty("assignmentId", studentAssignment.assignmentId);
            expect(response.body.data).toHaveProperty("status", 'submitted');
            expect(response.body.data).toHaveProperty("grade", "A");
        });
    });

    test('Fail to grade a non-existent student assignment', ({ given, when, then }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStudentAssignment({given});

        when('I try to grade a non-existent student assignment', async () => {
            requestBody = { id: "non-existent-student-assignment-id", grade: 'A' };
            response = await request(app).post("/student-assignments/grade").send(requestBody);
        });

        then('I should get an assignment not found error', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.AssignmentNotFound);
        });
    });

    test('Fail to grade a student assignment with missing student assignment ID', ({ given, when, then }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStudentAssignment({given});

        when('I try to grade a student assignment without providing a student assignment ID', async () => {
            response = await request(app).post("/student-assignments/grade").send(requestBody);
        });

        then('I should get a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });

    test('Fail to grade a student assignment with invalid grade', ({ given, when, then }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStudentAssignment({given});

        when('I try to grade a student assignment with an invalid grade', async () => {
            requestBody = { id: studentAssignment.id, grade: 'invalid-grade' };
            response = await request(app).post("/student-assignments/grade").send(requestBody);
        });

        then('I should get a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});
