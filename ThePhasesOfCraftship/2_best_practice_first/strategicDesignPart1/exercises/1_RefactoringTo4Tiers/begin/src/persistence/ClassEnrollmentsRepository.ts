import { PrismaClient } from "@prisma/client";
import { CreateAssignmentDTO, EnrollStudentToClassDTO } from "../dto";

export class ClassEnrollmentsRepository {
    constructor(private prisma: PrismaClient) {}

    async create (enrollStudentToClassDTO: EnrollStudentToClassDTO) {
        return this.prisma.classEnrollment.create({
            data: enrollStudentToClassDTO
        });
    }

    async findByStudentAndClass(enrollStudentToClassDTO: EnrollStudentToClassDTO) {
        return this.prisma.classEnrollment.findFirst({
            where: enrollStudentToClassDTO
        });
    }
}