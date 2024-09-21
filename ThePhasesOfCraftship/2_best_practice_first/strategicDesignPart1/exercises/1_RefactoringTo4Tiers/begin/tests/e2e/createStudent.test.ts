
import request from "supertest";
import { app } from "../../src";
import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";

const feature = loadFeature(
  path.join(__dirname, "../features/createStudent.feature")
);

defineFeature(feature, (test) => {

    afterAll(() => {
        app.close();
    });
    
    test("Successfully create a student", ({ given, when, then }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        given(/^I want to create a student with name "(.*)"$/, (name) => {
          requestBody = {
            name,
          };
        });

        when("I send a request to create a student", async () => {
          response = await request(app).post("/students").send(requestBody);
        });

        then("the student should be created successfully", () => {
          expect(response.status).toBe(201);
          expect(response.body.data.name).toBe(requestBody.name);
        });
      });


    test('Fail to create a student', ({ given, when, then }) => {
        let requestBody: any = {};
        let response: supertest.Response;

        given('I want to create a student with no name', () => {
            requestBody = {};
        });

        when('I send a request to create a student', async () => {
            response = await request(app).post("/students").send(requestBody);
        });

        then('the student should not be created', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe('ValidationError');
        });
    });
});