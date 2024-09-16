import { CreateStudentDTO } from "../dto";
import { StudentNotFoundError } from "../Errors";
import { StudentAssignmentsRepository, StudentsRepository } from "../persistence";

export class StudentsService {
    constructor(
        private studentsRepository: StudentsRepository,
        private studentAssignmentsRepository: StudentAssignmentsRepository
    ) {}

    async createStudent(createStudentDTO: CreateStudentDTO) {
        return await this.studentsRepository.create(createStudentDTO);
    }

    async getAllStudents() {
        return await this.studentsRepository.getAll();
    }

    async getStudentById(id: string) {
        const student = await this.studentsRepository.getById(id);

        if (!student) {
            throw new StudentNotFoundError();
        }
        return student;
    }

    async getStudentAssignments(id: string) {
        const student = await this.studentsRepository.getById(id);

        if (!student) {
            throw new StudentNotFoundError();
        }

        return await this.studentAssignmentsRepository.getAllByStudentId(id);
    }

    async getStudentGrades(id: string) {
        const student = await this.studentsRepository.getById(id);

        if (!student) {
            throw new StudentNotFoundError();
        }

        return await this.studentAssignmentsRepository.getAllGradedByStudentId(id);
    }
}

