import { prisma } from "../database";
import { CreateStudentDTO } from "../dto";

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
}
