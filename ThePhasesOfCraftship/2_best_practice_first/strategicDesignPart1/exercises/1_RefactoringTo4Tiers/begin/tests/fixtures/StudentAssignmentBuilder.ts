import { StudentAssignment, Assignment, Student } from '@prisma/client';
import { prisma } from "../../src/database";
import { AssignmentBuilder } from './AssignmentBuilder';
import { StudentBuilder } from './StudentBuilder';

export class StudentAssignmentBuilder {
  private studentAssignment = {} as StudentAssignment;
  private studentOrBuilder?: StudentBuilder | Student;
  private assignmentOrBuilder?: AssignmentBuilder | Assignment;

  andStudent(studentOrBuilder: StudentBuilder | Student) {
    this.studentOrBuilder = studentOrBuilder;
    return this;
  }
  
  fromAssignment(assignmentOrBuilder: AssignmentBuilder | Assignment) {
    this.assignmentOrBuilder = assignmentOrBuilder;
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
    const student = this.studentOrBuilder instanceof StudentBuilder ? await this.studentOrBuilder.build() : this.studentOrBuilder;
    const assignment = this.assignmentOrBuilder instanceof AssignmentBuilder ? await this.assignmentOrBuilder.build() : this.assignmentOrBuilder;

    return await prisma.studentAssignment.create({
      data: {
        studentId: student?.id || '',
        assignmentId: assignment?.id || '',
        grade: this.studentAssignment.grade,
        status: this.studentAssignment.status || '',
      },
    });
  }
}