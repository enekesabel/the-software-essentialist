import { Assignment, Class } from "@prisma/client";
import { prisma } from "../../src/database";
import { ClassRoomBuilder } from "./ClassRoomBuilder";
import { faker } from "@faker-js/faker";

export class AssignmentBuilder {
  static Fake() {
    return new AssignmentBuilder()
    .withTitle(`${faker.company.buzzNoun()} Test`)
    .andClassRoom(ClassRoomBuilder.Fake());
  }

  private assignment = {} as Assignment;
  private classRoomOrBuilder?: ClassRoomBuilder | Class

  withTitle(title: string): AssignmentBuilder {
    this.assignment.title = title;
    return this;
  }

  andClassRoom(classRoomOrBuilder: ClassRoomBuilder | Class) {
    this.classRoomOrBuilder = classRoomOrBuilder;
    return this;
  }

  async build(): Promise<Assignment> {
    const classRoom = this.classRoomOrBuilder instanceof ClassRoomBuilder ? await this.classRoomOrBuilder.build() : this.classRoomOrBuilder;
    const createdAssignment = await prisma.assignment.create({
      data: {
        title: this.assignment.title,
        classId: classRoom?.id || ''
      }
    });
    return createdAssignment;
  }

}