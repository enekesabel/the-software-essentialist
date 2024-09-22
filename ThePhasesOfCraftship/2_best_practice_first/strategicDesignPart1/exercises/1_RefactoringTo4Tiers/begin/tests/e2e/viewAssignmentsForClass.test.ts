import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase, AssignmentBuilder, ClassRoomBuilder } from "../fixtures";
import { Assignment, Class } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/viewAssignmentsForClass.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    let assignments: Assignment[] = [];
    let classRoom: Class;

    test('Successfully view all assignments for a class', ({ when, then, given }) => {
        let response: supertest.Response;

        given('I have assignments for a class', async() => {
            classRoom = await new ClassRoomBuilder().withName('Math Class').build();
            assignments[0] = await new AssignmentBuilder().withTitle('Assignment 1').andClassRoom(classRoom).build();
            assignments[1] = await new AssignmentBuilder().withTitle('Assignment 2').andClassRoom(classRoom).build();
        });

        when('I send a request to view all assignments for a class', async () => {
            response = await request(app).get(`/classes/${classRoom.id}/assignments`);
        });

        then('the request should return a list of assignments', () => {
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(2);
            expect(response.body.data[0]).toHaveProperty("title", assignments[0].title);
            expect(response.body.data[1]).toHaveProperty("title", assignments[1].title);
        });
    });

    test('View assignments for a non-existent class', ({ when, then }) => {
        let response: supertest.Response;
        const nonExistentClassId = 'bf00589d-0af7-449e-8378-c43ed754d1f3'

        when('I send a request to view all assignments for a non-existent class', async () => {
            response = await request(app).get(`/classes/${nonExistentClassId}/assignments`);
        });

        then('the request should return a class not found error', () => {
            expect(response.status).toBe(404);
            expect(response.body.error).toBe(Errors.ClassNotFound);
        });
    });

    test('View assignments for a class with invalid class id', ({ when, then }) => {
        let response: supertest.Response;
        const invalidClassId = 'invalid-class-id'

        when('I send a request to view all assignments for a class with an invalid class id', async () => {
            response = await request(app).get(`/classes/${invalidClassId}/assignments`);
        });

        then('the request should return a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });
});
