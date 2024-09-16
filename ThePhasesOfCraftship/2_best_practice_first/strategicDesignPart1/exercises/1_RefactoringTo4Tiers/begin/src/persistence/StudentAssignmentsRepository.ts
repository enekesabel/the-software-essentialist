import { PrismaClient } from "@prisma/client";
import { CreateStudentAssignmentDTO, UpdateStudentAssignmentDTO } from "../dto";

export class StudentAssignmentsRepository {

    constructor(private prisma: PrismaClient) {}

    async create(createStudentAssignmentDTO: CreateStudentAssignmentDTO) {
        return await this.prisma.studentAssignment.create({
            data: createStudentAssignmentDTO
        });
    }

    async update(id: string, updateStudentAssignmentDTO: UpdateStudentAssignmentDTO) {
        return await this.prisma.studentAssignment.update({
            where: {
                id
            },
            data: updateStudentAssignmentDTO
        });
    }

    async getById(id: string) {
        return await this.prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });
    }

    async getAllByStudentId(studentId: string) {
        return await this.prisma.studentAssignment.findMany({
            where: {
                studentId,
                status: 'submitted'
            },
            include: {
                assignment: true
            },
        });
    }

    async getAllGradedByStudentId(studentId: string) {
        return await this.prisma.studentAssignment.findMany({
            where: {
                studentId,
                status: 'submitted',
                grade: {
                    not: null
                }
            },
            include: {
                assignment: true
            },
        });
    }
}