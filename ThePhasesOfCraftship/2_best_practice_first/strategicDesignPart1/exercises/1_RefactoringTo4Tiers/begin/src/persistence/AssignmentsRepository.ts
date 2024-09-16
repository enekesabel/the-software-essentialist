import { PrismaClient } from "@prisma/client";
import { CreateAssignmentDTO } from "../dto";

export class AssingmentsRepository {
    constructor(private prisma: PrismaClient) {}

    async create (createAssignmentDTO: CreateAssignmentDTO) {
        return this.prisma.assignment.create({
            data: createAssignmentDTO
        });
    }

    async findById(id: string) {
        return this.prisma.assignment.findUnique({
            include: {
                class: true,
                studentTasks: true
            },
            where: {
                id
            }
        });
    }

    async findByClassId(classId: string) {
        return this.prisma.assignment.findMany({
            where: {
                classId
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
    }
}