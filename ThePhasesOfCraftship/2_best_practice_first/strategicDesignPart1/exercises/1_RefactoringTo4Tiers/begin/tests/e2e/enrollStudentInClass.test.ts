import { defineFeature, loadFeature } from "jest-cucumber";
import path from "path";
import supertest from "supertest";
import request from "supertest";
import { app, Errors } from "../../src";
import { resetDatabase } from "../fixtures/reset";
import { ClassRoomBuilder } from "../fixtures/ClassRoomBuilder";
import { StudentBuilder } from "../fixtures/StudentBuilder";

const feature = loadFeature(
  path.join(__dirname, "../features/enrollStudentInClass.feature")
);

defineFeature(feature, (test) => {

    beforeEach(resetDatabase);

    afterAll(() => {
        app.close();
    });

  test('Successfully enroll a student in a class', ({ given, and, when, then }) => {
    let requestBody: any = {};
    let response: supertest.Response;
    let studentId: string;
    let classId: string;

    given('I have a student with name "John Doe"', async () => {
      const student = await new StudentBuilder().withName("John Doe").build();
      studentId = student.id;
    });

    and('I have a class with name "Math 101"', async () => {
      const classRoom = await new ClassRoomBuilder().withName("Math 101").build();
      classId = classRoom.id;
    });

    when('I send a request to enroll the student in the class', async () => {
      requestBody = { studentId, classId };
      response = await request(app).post("/class-enrollments").send(requestBody);
    });

    then('the student should be enrolled in the class successfully', () => {
      expect(response.status).toBe(201);
      expect(response.body.data).toHaveProperty("studentId", studentId);
      expect(response.body.data).toHaveProperty("classId", classId);
    });
  });

  test('Fail to enroll a student in a class with missing student ID', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: supertest.Response;
    let classId: string;

    given('I have a class with name "Math 101"', async () => {
      const classRoom = await new ClassRoomBuilder().withName("Math 101").build();
      classId = classRoom.id;
    });

    when('I send a request to enroll a student in the class with missing student ID', async () => {
      requestBody = { classId };
      response = await request(app).post("/class-enrollments").send(requestBody);
    });

    then('the request should return a validation error', () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(Errors.ValidationError);
    });
  });

  test('Fail to enroll a student in a class with missing class ID', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: supertest.Response;
    let studentId: string;

    given('I have a student with name "John Doe"', async () => {
      const student = await new StudentBuilder().withName("John Doe").build();
      studentId = student.id;
    });

    when('I send a request to enroll the student in a class with missing class ID', async () => {
      requestBody = { studentId };
      response = await request(app).post("/class-enrollments").send(requestBody);
    });

    then('the request should return a validation error', () => {
      expect(response.status).toBe(400);
      expect(response.body.error).toBe(Errors.ValidationError);
    });
  });

  test('Fail to enroll a student in a class with non-existent student', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: supertest.Response;
    let classId: string;

    given('I have a class with name "Math 101"', async () => {
      const classRoom = await new ClassRoomBuilder().withName("Math 101").build();
      classId = classRoom.id;
    });

    when('I send a request to enroll a non-existent student in the class', async () => {
      requestBody = { studentId: "non-existent-student-id", classId };
      response = await request(app).post("/class-enrollments").send(requestBody);
    });

    then('the request should return a student not found error', () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(Errors.StudentNotFound);
    });
  });

  test('Fail to enroll a student in a class with non-existent class', ({ given, when, then }) => {
    let requestBody: any = {};
    let response: supertest.Response;
    let studentId: string;

    given('I have a student with name "John Doe"', async () => {
      const student = await new StudentBuilder().withName("John Doe").build();
      studentId = student.id;
    });

    when('I send a request to enroll the student in a non-existent class', async () => {
      requestBody = { studentId, classId: "non-existent-class-id" };
      response = await request(app).post("/class-enrollments").send(requestBody);
    });

    then('the request should return a class not found error', () => {
      expect(response.status).toBe(404);
      expect(response.body.error).toBe(Errors.ClassNotFound);
    });
  });
});

