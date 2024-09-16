import { PrismaClient } from "@prisma/client";
import { CreateStudentDTO } from "../dto";
import { StudentNotFoundError } from "../Errors";
import { prisma } from "../database";
import { StudentsRepository } from "../persistence";

export class StudentsService {
    constructor(private studentsRepository: StudentsRepository) {}

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

        return await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
                status: 'submitted'
            },
            include: {
                assignment: true
            },
        });
    }

    async getStudentGrades(id: string) {
        const student = await this.studentsRepository.getById(id);

        if (!student) {
            throw new StudentNotFoundError();
        }

        return await prisma.studentAssignment.findMany({
            where: {
                studentId: id,
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

