import { CreateStudentAssignmentDTO, GradeStudentAssignmentDTO } from "../dto";
import { StudentNotFoundError, AssignmentNotFoundError } from "../Errors";
import { AssingmentsRepository, StudentAssignmentsRepository, StudentsRepository } from "../persistence";

export class StudentAssignmentsService {

    constructor(
        private assignmentsRepository: AssingmentsRepository,
        private studentsRepository: StudentsRepository,
        private studentAssignmentsRepository: StudentAssignmentsRepository,
    ) {}

    async createStudentAssignment(createStudentAssignmentDTO: CreateStudentAssignmentDTO) {
        const { studentId, assignmentId } = createStudentAssignmentDTO;

        // check if student exists
        const student = await this.studentsRepository.getById(studentId);

        if (!student) {
            throw new StudentNotFoundError();
        }

        // check if assignment exists
        const assignment = this.assignmentsRepository.getById(assignmentId);

        if (!assignment) {
            throw new AssignmentNotFoundError();
        }

        const studentAssignment = await this.studentAssignmentsRepository.create(createStudentAssignmentDTO);

        return studentAssignment;
    }

    async submitStudentAssignment(id: string) {
        // check if student assignment exists
        const studentAssignment = await this.studentAssignmentsRepository.getById(id);

        if (!studentAssignment) {
            throw new AssignmentNotFoundError();
        }

        const studentAssignmentUpdated = await this.studentAssignmentsRepository.update(id, {
            status: 'submitted',
        });

        return studentAssignmentUpdated;
    }

    async gradeStudentAssignment(gradeStudentAssignmentDTO: GradeStudentAssignmentDTO) {
        const { id, grade } = gradeStudentAssignmentDTO;

        // check if student assignment exists
        const studentAssignment = await this.studentAssignmentsRepository.getById(id);

        if (!studentAssignment) {
            throw new AssignmentNotFoundError();
        }

        const studentAssignmentUpdated = await this.studentAssignmentsRepository.update(id, {
            grade
        });

        return studentAssignmentUpdated;
    }
}
