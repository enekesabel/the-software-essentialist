import { PrismaClient } from "@prisma/client";
import { EnrollStudentToClassDTO } from "../dto";

export class ClassEnrollmentsRepository {
    constructor(private prisma: PrismaClient) {}

    async create (enrollStudentToClassDTO: EnrollStudentToClassDTO) {
        return this.prisma.classEnrollment.create({
            data: enrollStudentToClassDTO
        });
    }

    async getByStudentAndClass(enrollStudentToClassDTO: EnrollStudentToClassDTO) {
        return this.prisma.classEnrollment.findFirst({
            where: enrollStudentToClassDTO
        });
    }
}