import { defineFeature, DefineStepFunction, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase, AssignmentBuilder, StudentBuilder } from "../fixtures";
import { Assignment, Student } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/assignStudentToAssignment.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    let student: Student;
    let assignment: Assignment;

    const givenIHaveAStundentAndAnAssignment = ({given, and}:{given: DefineStepFunction, and: DefineStepFunction}) => {
        given('I have a student', async() => {
            student = await StudentBuilder.Fake().build();
        });

        and('I have an assignment', async () => {
            assignment = await AssignmentBuilder.Fake().build();
        });
    }

    test('Successfully assign a student to an assignment', ({ when, then, given, and }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStundentAndAnAssignment({given, and});

        when('I assign the student to the assignment', async () => {
            requestBody = { studentId: student.id, assignmentId: assignment.id };
            response = await request(app).post("/student-assignments").send(requestBody);
        });

        then('the student should be assigned to the assignment successfully', () => {
            expect(response.status).toBe(201);
            expect(response.body.data).toHaveProperty("studentId", student.id);
            expect(response.body.data).toHaveProperty("assignmentId", assignment.id);
        });
    });

    test('Fail to assign a non-existent student to an assignment', ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStundentAndAnAssignment({given, and});

        when('I try to assign a non-existent student to an assignment', async () => {
            requestBody = { studentId: "non-existent-student-id", assignmentId: assignment.id };
            response = await request(app).post("/student-assignments").send(requestBody);
        });

        then('I should get a student not found error', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.StudentNotFound);
        });
    });

    test('Fail to assign a student to a non-existent assignment', ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStundentAndAnAssignment({given, and});

        when('I try to assign a student to a non-existent assignment', async () => {
            requestBody = { studentId: student.id, assignmentId: "non-existent-assignment-id" };
            response = await request(app).post("/student-assignments").send(requestBody);
        });

        then('I should get an assignment not found error', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.AssignmentNotFound);
        });
    });

    test('Fail to assign a student to an assignment with missing student ID', ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStundentAndAnAssignment({given, and});

        when('I try to assign a student to an assignment without providing a student ID', async () => {
            requestBody = { assignmentId: assignment.id };
            response = await request(app).post("/student-assignments").send(requestBody);
        });

        then('I should get a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });

    test('Fail to assign a student to an assignment with missing assignment ID', ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStundentAndAnAssignment({given, and});

        when('I try to assign a student to an assignment without providing an assignment ID', async () => {
            requestBody = { studentId: student.id };
            response = await request(app).post("/student-assignments").send(requestBody);
        });

        then('I should get a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});

