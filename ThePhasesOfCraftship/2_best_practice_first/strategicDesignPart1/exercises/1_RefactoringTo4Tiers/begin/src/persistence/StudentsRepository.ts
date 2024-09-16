import { PrismaClient } from "@prisma/client";
import { CreateStudentDTO } from "../dto";

export class StudentsRepository {
    constructor(private prisma: PrismaClient) {}

    async create(createStudentDTO: CreateStudentDTO) {
        const { name } = createStudentDTO;

        return await this.prisma.student.create({
            data: {
                name
            }
        });
    }

    async getAll() {
        return await this.prisma.student.findMany({
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

    async getById(id: string) {
        return await this.prisma.student.findUnique({
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