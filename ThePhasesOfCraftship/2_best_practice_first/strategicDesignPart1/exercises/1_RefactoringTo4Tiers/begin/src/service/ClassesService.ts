import { CreateClassDTO } from "../dto";
import { ClassNotFoundError } from "../Errors";
import { AssingmentsRepository, ClassesRepository } from "../persistence";

export class ClassesService {

    constructor(
        private assignmentsRepository: AssingmentsRepository,
        private classesRepository: ClassesRepository
    ) {}

    async getClassById(id: string) {
        const cls = await this.classesRepository.getById(id);

        if (!cls) {
            throw new ClassNotFoundError();
        }

        return cls;
    }

    async getAssignments(classId: string) {
        await this.getClassById(classId);
        return await this.assignmentsRepository.getByClassId(classId);
    }

    async createClass(classDTO: CreateClassDTO) {
        return await this.classesRepository.create(classDTO);
    }

}
