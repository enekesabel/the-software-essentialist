import { PrismaClient } from "@prisma/client";
import { CreateClassDTO } from "../dto";

export class ClassesRepository {

    constructor(private prisma: PrismaClient) {}

    async getById(id: string) {
        return this.prisma.class.findUnique({
            where: {
                id
            }
        });
    }

    async create(classDTO: CreateClassDTO) {
        return this.prisma.class.create({
            data: classDTO
        });
    }
}