import { Assignment } from "@prisma/client";
import { prisma } from "../../src/database";

export class AssignmentBuilder {
  private assignment = {} as Assignment;

  withTitle(title: string): AssignmentBuilder {
    this.assignment.title = title;
    return this;
  }

  async build(): Promise<Assignment> {
    const createdAssignment = await prisma.assignment.create({
      data: this.assignment,
    });
    return createdAssignment;
  }
}