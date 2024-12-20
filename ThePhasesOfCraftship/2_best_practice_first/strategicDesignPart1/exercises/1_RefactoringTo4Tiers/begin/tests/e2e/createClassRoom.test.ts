import request from "supertest";
import { app, Errors } from "../../src";

import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import { resetDatabase } from "../fixtures/reset";
import { Class } from "@prisma/client";
import { ClassRoomBuilder } from "../fixtures/ClassRoomBuilder";

const feature = loadFeature(
  path.join(__dirname, "../features/createClassRoom.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

    test("Sucessfully create a class room", ({ given, when, then }) => {
        let requestBody: any = {};
        let response: supertest.Response;
    
        given(/^I want to create a class room named "(.*)"$/, (name) => {
          requestBody = {
            name,
          };
        });
    
        when('I try to create the class room', async () => {
          response = await request(app).post("/classes").send(requestBody);
        });
    
        then("the class room should be created successfully", () => {
          expect(response.status).toBe(201);
          expect(response.body.data.name).toBe(requestBody.name);
        });
      });

    test('Fail to create a class room with no name', ({ given, when, then }) => {
        let requestBody: any = {};
        let response: supertest.Response;
        
        given('I want to create a class room with no name', () => {
            requestBody = {};
        });

        when('I try to create the class room', async () => {
            response = await request(app).post("/classes").send(requestBody);
        });

        then('I should get a validation error', () => {
            expect(response.status).toBe(400);
            expect(response.body.error).toBe(Errors.ValidationError);
        });
    });

    test('Fail to create a class room with the same name', ({ given, and, when, then }) => {
      let classRoom: Class;
      let requestBody: any = {};
      let response: supertest.Response;

      given(/^A class room named "(.*)" already exists$/, async (name) => {
        classRoom = await new ClassRoomBuilder().withName(name).build();
      });

      and("I want to create a class room with the same name", () => {
        requestBody = {
          name: classRoom.name,
        };
      });

      when('I try to create the class room', async () => {
        response = await request(app).post("/classes").send(requestBody);
      });

      then('I should get an error', () => {
        expect(response.status).toBe(500);
      });
  });
});