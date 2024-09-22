import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase, StudentBuilder } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/viewStudent.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    let student: any;

    test('Successfully view a student', ({ when, then, given }) => {
        let response: supertest.Response;

        given('I have a student', async() => {
            student = await new StudentBuilder().withName('John Doe').build();
        });

        when('I try to view the student', async () => {
            response = await request(app).get(`/students/${student.id}`);
        });

        then('I should get the student details and assignments', () => {
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("name", student.name);
            expect(response.body.data).toHaveProperty("assignments");
        });
    });

    test('View a non-existent student', ({ when, then }) => {
        let response: supertest.Response;

        when('I try to view a non-existent student', async () => {
            response = await request(app).get(`/students/bf00589d-0af7-449e-8378-c43ed754d1f3`);
        });

        then('I should get a student not found error', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.StudentNotFound);
        });
    });

    test('View student with invalid id', ({ when, then }) => {
        let response: supertest.Response;

        when('I try to view a student by providing an invalid student ID', async () => {
            response = await request(app).get(`/students/invalid-id`);
        });

        then('I should get a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});
