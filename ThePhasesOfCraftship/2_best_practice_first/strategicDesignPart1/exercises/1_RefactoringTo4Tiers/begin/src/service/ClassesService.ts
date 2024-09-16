import { prisma } from "../database";
import { CreateClassDTO } from "../dto";
import { ClassNotFoundError } from "../Errors";
import { AssingmentsRepository } from "../persistence";

export class ClassesService {

    constructor(private assignmentsRepository: AssingmentsRepository) {}

    async getClassById(id: string) {
        const cls = await prisma.class.findUnique({
            where: {
                id
            }
        });

        if (!cls) {
            throw new ClassNotFoundError();
        }

        return cls;
    }

    async getAssignments(classId: string) {
        await this.getClassById(classId);
        return await this.assignmentsRepository.findByClassId(classId);
    }

    async createClass(classDTO: CreateClassDTO) {
        const cls = await prisma.class.create({
            data: classDTO
        });
        
        return cls;
    }

}