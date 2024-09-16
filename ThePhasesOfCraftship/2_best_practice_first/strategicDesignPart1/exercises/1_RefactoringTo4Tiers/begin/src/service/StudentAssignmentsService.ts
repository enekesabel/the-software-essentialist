import { prisma } from "../database";
import { CreateStudentAssignmentDTO, GradeStudentAssignmentDTO } from "../dto";
import { StudentNotFoundError, AssignmentNotFoundError } from "../Errors";

export class StudentAssignmentsService {
    async createStudentAssignment(createStudentAssignmentDTO: CreateStudentAssignmentDTO) {
        const { studentId, assignmentId } = createStudentAssignmentDTO;

        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student) {
            throw new StudentNotFoundError();
        }

        // check if assignment exists
        const assignment = await prisma.assignment.findUnique({
            where: {
                id: assignmentId
            }
        });

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