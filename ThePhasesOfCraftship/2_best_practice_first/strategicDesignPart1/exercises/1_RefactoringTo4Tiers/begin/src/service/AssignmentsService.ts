import { prisma } from "../database";
import { CreateAssignmentDTO } from "../dto";
import { AssignmentNotFoundError } from "../Errors";

export class AssignmentsService {
    async createAssignment(createAssignmentDTO: CreateAssignmentDTO) {
        return await prisma.assignment.create({
            data: createAssignmentDTO
        });
    }

    async getAssignmentById(id: string) {
        const assignment = await prisma.assignment.findUnique({
            include: {
                class: true,
                studentTasks: true
            },
            where: {
                id
            }
        });
        if (!assignment) {
            throw new AssignmentNotFoundError();
        }
        return assignment;
    }
}
