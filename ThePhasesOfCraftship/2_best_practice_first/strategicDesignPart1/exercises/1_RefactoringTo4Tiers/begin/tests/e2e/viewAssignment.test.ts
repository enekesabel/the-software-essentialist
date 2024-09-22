import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase, AssignmentBuilder, ClassRoomBuilder } from "../fixtures";
import { Assignment } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/viewAssignment.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    let assignment: Assignment;

    test('Successfully view an assignment', ({ when, then, given }) => {
        let response: supertest.Response;

        given('I have an assignment', async() => {
            assignment = await new AssignmentBuilder()
            .withTitle('Math Test')
            .andClassRoom(new ClassRoomBuilder().withName('Math Class'))
            .build();
        });

        when('I send a request to view the assignment', async () => {
            response = await request(app).get(`/assignments/${assignment.id}`);
        });

        then('the request should return the assignment details and students', () => {
            expect(response.status).toBe(200);
            expect(response.body.data).toHaveProperty("title", assignment.title);
            expect(response.body.data).toHaveProperty("studentTasks");
        });
    });

    test('View a non-existent assignment', ({ when, then }) => {
        let response: supertest.Response;

        when('I send a request to view a non-existent assignment', async () => {
            response = await request(app).get(`/assignments/bf00589d-0af7-449e-8378-c43ed754d1f3`);
        });

        then('the request should return 404', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.AssignmentNotFound);
        });
    });

    test('View assignment with invalid id', ({ when, then }) => {
        let response: supertest.Response;

        when('I send a request to view an assignment with invalid id', async () => {
            response = await request(app).get(`/assignments/invalid-id`);
        });

        then('the request should return a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});

