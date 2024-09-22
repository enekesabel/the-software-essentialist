import { defineFeature, DefineStepFunction, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase, AssignmentBuilder, ClassRoomBuilder, StudentBuilder, StudentAssignmentBuilder } from "../fixtures";
import { StudentAssignment } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/submitStudentAssignment.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    let studentAssignment: StudentAssignment;

    const givenIHaveAStudentAssignment = ({given}:{given: DefineStepFunction}) => {
        given('I have a student assignment', async() => {
            studentAssignment = await new StudentAssignmentBuilder()
            .fromAssignment(new AssignmentBuilder().withTitle('Math Assignment').andClassRoom(new ClassRoomBuilder().withName('Math Class')))
            .andStudent(new StudentBuilder().withName('John Doe'))
            .build();
        });
    }

    test('Successfully submit a student assignment', ({ when, then, given, and }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStudentAssignment({given});

        when('I try to submit the student assignment', async () => {
            requestBody = { id: studentAssignment.id };
            response = await request(app).post("/student-assignments/submit").send(requestBody);
        });

        then('the student assignment should be submitted successfully', () => {
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("studentId", studentAssignment.studentId);
            expect(response.body.data).toHaveProperty("assignmentId", studentAssignment.assignmentId);
            expect(response.body.data).toHaveProperty("status", 'submitted');
        });
    });

    test('Fail to submit a non-existent student assignment', ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStudentAssignment({given});

        when('I try to submit a non-existent student assignment', async () => {
            requestBody = { id: "non-existent-student-assignment-id" };
            response = await request(app).post("/student-assignments/submit").send(requestBody);
        });

        then('I should get an assignment not found error', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.AssignmentNotFound);
        });
    });

    test('Fail to submit a student assignment with missing student assignment ID', ({ given, when, then, and }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        givenIHaveAStudentAssignment({given});

        when('I try to submit a student assignment without providing a student assignment ID', async () => {
            response = await request(app).post("/student-assignments/submit").send(requestBody);
        });

        then('I should get a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});

