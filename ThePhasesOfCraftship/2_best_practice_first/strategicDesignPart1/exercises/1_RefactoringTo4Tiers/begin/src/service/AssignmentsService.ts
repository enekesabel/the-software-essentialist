import { CreateAssignmentDTO } from "../dto";
import { AssignmentNotFoundError } from "../Errors";
import { AssingmentsRepository } from "../persistence";

export class AssignmentsService {

    constructor(private assignmentsRepository: AssingmentsRepository) {}

    async createAssignment(createAssignmentDTO: CreateAssignmentDTO) {
        return this.assignmentsRepository.create(createAssignmentDTO);
    }

    async getAssignmentById(id: string) {
        const assignment = this.assignmentsRepository.findById(id);
        if (!assignment) {
            throw new AssignmentNotFoundError();
        }
        return assignment;
    }
}
