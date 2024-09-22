import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase, ClassRoomBuilder } from "../fixtures";

const feature = loadFeature(
  path.join(__dirname, "../features/createAssignment.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

  test('Successfully create an assignment', ({ given, and, when, then }) => {
    let requestBody: any = {};
    let response: supertest.Response;
    let classId: string;
    let title: string;

    given(/^a class named "(.*)" exists$/, async (className) => {
      const classRoom = await new ClassRoomBuilder().withName(className).build();
      classId = classRoom.id;
    });

    and(/^I want to create an assignment with title "(.*)"$/, async (assignmentTitle) => {
      title = assignmentTitle;
    });

    when('I send a request to create an assignment', async () => {
      requestBody = { title, classId };
      response = await request(app).post("/assignments").send(requestBody);
    });

    then('the assignment should be created successfully', () => {
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("title", title);
    });
  });

  test('Fail to create an assignment with no title', ({ given, and, when, then }) => {
    let requestBody: any = {};
    let response: supertest.Response;
    let classId: string;
    let title: string;

    given(/^a class named "(.*)" exists$/, async (className) => {
      const classRoom = await new ClassRoomBuilder().withName(className).build();
      classId = classRoom.id;
    });

    and('I want to create an assignment with no title', async () => {
    });

    when('I send a request to create an assignment', async () => {
      requestBody = { classId, title };
      response = await request(app).post("/assignments").send(requestBody);
    });

    then('the request should return a validation error', () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(Errors.ValidationError);
    });
  });

  test('Fail to create an assignment with no class id', ({ given, and, when, then }) => {
    let requestBody: any = {};
    let response: supertest.Response;
    let title: string;

    and(/^I want to create an assignment with title "(.*)"$/, async (assignmentTitle) => {
      title = assignmentTitle;
    });

    when('I send a request to create an assignment with no class id', async () => {
      requestBody = { title };
      response = await request(app).post("/assignments").send(requestBody);
    });

    then('the request should return a validation error', () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(Errors.ValidationError);
    });
  });
});

