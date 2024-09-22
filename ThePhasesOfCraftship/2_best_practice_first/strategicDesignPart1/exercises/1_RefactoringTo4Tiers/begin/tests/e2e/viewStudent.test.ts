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

        when('I send a request to view the student', async () => {
            response = await request(app).get(`/students/${student.id}`);
        });

        then('the request should return the student details and assignments', () => {
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("name", student.name);
            expect(response.body.data).toHaveProperty("assignments");
        });
    });

    test('View a non-existent student', ({ when, then }) => {
        let response: supertest.Response;

        when('I send a request to view a non-existent student', async () => {
            response = await request(app).get(`/students/bf00589d-0af7-449e-8378-c43ed754d1f3`);
        });

        then('the request should return 404', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.StudentNotFound);
        });
    });

    test('View student with invalid id', ({ when, then }) => {
        let response: supertest.Response;

        when('I send a request to view a student with invalid id', async () => {
            response = await request(app).get(`/students/invalid-id`);
        });

        then('the request should return a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});
