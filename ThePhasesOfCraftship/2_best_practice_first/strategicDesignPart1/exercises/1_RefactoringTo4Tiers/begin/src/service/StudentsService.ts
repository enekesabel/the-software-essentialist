import { prisma } from "../database";
import { CreateStudentDTO } from "../dto";
import { StudentNotFoundError } from "../Errors";

export class StudentsService {
    async createStudent(createStudentDTO: CreateStudentDTO) {
        const { name } = createStudentDTO;

        return await prisma.student.create({
            data: {
                name
            }
        });
    }

    async getAllStudents() {
        return await prisma.student.findMany({
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }, 
            orderBy: {
                name: 'asc'
            }
        });
    }

    async getStudentById(id: string) {
        return await prisma.student.findUnique({
            where: {
                id
            },
            include: {
                classes: true,
                assignments: true,
                reportCards: true
            }
        });
    }

    async getStudentAssignments(id: string) {
        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id
            }
        });

        if (!student) {
            throw new StudentNotFoundError();
        }

        return await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted'
            },
            include: {
                assignment: true
            },
        });
    }
}
