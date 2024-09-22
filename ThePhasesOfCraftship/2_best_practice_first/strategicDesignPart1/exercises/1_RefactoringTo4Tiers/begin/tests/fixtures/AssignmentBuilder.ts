import { Assignment } from "@prisma/client";
import { prisma } from "../../src/database";
import { ClassRoomBuilder } from "./ClassRoomBuilder";

export class AssignmentBuilder {
  private assignment = {} as Assignment;
  private classRoomBuilder?: ClassRoomBuilder

  withTitle(title: string): AssignmentBuilder {
    this.assignment.title = title;
    return this;
  }

  andClassRoom(classRoomBuilder: ClassRoomBuilder) {
    this.classRoomBuilder = classRoomBuilder;
    return this;
  }

  async build(): Promise<Assignment> {
    const classRoom = await this.classRoomBuilder?.build();
    const createdAssignment = await prisma.assignment.create({
      data: {
        title: this.assignment.title,
        classId: classRoom?.id || ''
      }
    });
    return createdAssignment;
  }
}