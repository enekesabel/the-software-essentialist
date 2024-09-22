import { StudentAssignment } from '@prisma/client';
import { prisma } from "../../src/database";
import { AssignmentBuilder } from './AssignmentBuilder';
import { StudentBuilder } from './StudentBuilder';

export class StudentAssignmentBuilder {
  private studentAssignment = {} as StudentAssignment;
  private studentBuilder?: StudentBuilder;
  private assignmentBuilder?: AssignmentBuilder;

  withStudent(studentBuilder: StudentBuilder) {
    this.studentBuilder = studentBuilder;
    return this;
  }
  
  withAssingment(assignmentBuilder: AssignmentBuilder) {
    this.assignmentBuilder = assignmentBuilder;
    return this;
  }

  withGrade(grade: string) {
    this.studentAssignment.grade = grade;
    return this;
  }

  withStatus(status: string) {
    this.studentAssignment.status = status;
    return this;
  }

  async build() {
    const student = await this.studentBuilder?.build();
    const assignment = await this.assignmentBuilder?.build();

    return await prisma.studentAssignment.create({
      data: {
        studentId: student?.id || '',
        assignmentId: assignment?.id || '',
        grade: this.studentAssignment.grade || '',
        status: this.studentAssignment.status || '',
      },
    });
  }
}