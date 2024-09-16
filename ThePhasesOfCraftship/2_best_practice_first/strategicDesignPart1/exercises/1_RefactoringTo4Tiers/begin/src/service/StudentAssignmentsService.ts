import { prisma } from "../database";
import { CreateStudentAssignmentDTO, GradeStudentAssignmentDTO } from "../dto";
import { StudentNotFoundError, AssignmentNotFoundError } from "../Errors";
import { AssingmentsRepository, StudentsRepository } from "../persistence";

export class StudentAssignmentsService {

    constructor(
        private assignmentsRepository: AssingmentsRepository,
        private studentsRepository: StudentsRepository,
    ) {}

    async createStudentAssignment(createStudentAssignmentDTO: CreateStudentAssignmentDTO) {
        const { studentId, assignmentId } = createStudentAssignmentDTO;

        // check if student exists
        const student = this.studentsRepository.getById(studentId);

        if (!student) {
            throw new StudentNotFoundError();
        }

        // check if assignment exists
        const assignment = await this.assignmentsRepository.findById(assignmentId);

        if (!assignment) {
            throw new AssignmentNotFoundError();
        }

        const studentAssignment = await prisma.studentAssignment.create({
            data: {
                studentId,
                assignmentId,
            }
        });

        return studentAssignment;
    }

    async submitStudentAssignment(id: string) {
        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });

        if (!studentAssignment) {
            throw new AssignmentNotFoundError();
        }

        const studentAssignmentUpdated = await prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                status: 'submitted'
            }
        });

        return studentAssignmentUpdated;
    }

    async gradeStudentAssignment(gradeStudentAssignmentDTO: GradeStudentAssignmentDTO) {
        const { id, grade } = gradeStudentAssignmentDTO;

        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });

        if (!studentAssignment) {
            throw new AssignmentNotFoundError();
        }

        const studentAssignmentUpdated = await prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade,
            }
        });

        return studentAssignmentUpdated;
    }
}