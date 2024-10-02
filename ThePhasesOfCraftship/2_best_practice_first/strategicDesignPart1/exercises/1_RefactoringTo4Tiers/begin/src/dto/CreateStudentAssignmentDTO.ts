import { DTOValidationError } from "./utils";

export class CreateStudentAssignmentDTO {
  readonly studentId: string;
  readonly assignmentId: string;

  private constructor(studentId: string, assignmentId: string) {
    this.studentId = studentId;
    this.assignmentId = assignmentId;
  }

  static Create({ studentId, assignmentId }: { studentId: string, assignmentId: string }): CreateStudentAssignmentDTO | DTOValidationError {
    if (studentId && assignmentId) {
      return new CreateStudentAssignmentDTO(studentId, assignmentId);
    }
    return new DTOValidationError();
  }
}
