import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app } from "../../src";
import { resetDatabase, StudentBuilder } from "../fixtures";
import { Student } from "@prisma/client";

const feature = loadFeature(
  path.join(__dirname, "../features/viewAllStudents.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    let students: Student[] = [];

    test('Successfully view all students', ({ when, then, given }) => {
        let response: supertest.Response;

        given('I have students', async() => {
            students[0] = await StudentBuilder.Fake().build();
            students[1] = await StudentBuilder.Fake().build();
        });

        when('I try to view all students', async () => {
            response = await request(app).get("/students");
        });

        then('I should get the full list of students', () => {
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBe(2);
            expect(response.body.data[0]).toHaveProperty("name", students[0].name);
            expect(response.body.data[1]).toHaveProperty("name", students[1].name);
        });
    });
});
