import { prisma } from "../database";
import { CreateClassDTO } from "../dto";
import { ClassNotFoundError } from "../Errors";

export class ClassesService {

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
        return await prisma.assignment.findMany({
            where: {
                classId
            },
            include: {
                class: true,
                studentTasks: true
            }
        });
    }

    async createClass(classDTO: CreateClassDTO) {
        const cls = await prisma.class.create({
            data: classDTO
        });
        
        return cls;
    }

}