import { EnrollStudentToClassDTO } from "../dto";
import { StudentNotFoundError, StudentAlreadyEnrolledError, ClassNotFoundError } from "../Errors";
import { ClassEnrollmentsRepository, ClassesRepository, StudentsRepository } from "../persistence";

export class ClassEnrollmentsService {

    constructor(
        private classesRepository: ClassesRepository,
        private classEnrollmentsRepository: ClassEnrollmentsRepository,
        private studentsRepository: StudentsRepository,
    ) {}

    async enrollStudentToClass(enrollStudentToClassDTO: EnrollStudentToClassDTO) {
    
        // check if student exists
        const student = await this.studentsRepository.getById(enrollStudentToClassDTO.studentId);
        
        if (!student) {
            throw new StudentNotFoundError();
        }
    
        // check if class exists
        const cls = this.classesRepository.getById(enrollStudentToClassDTO.classId);
    
        // check if student is already enrolled in class
        const duplicatedClassEnrollment = await this.classEnrollmentsRepository.getByStudentAndClass(enrollStudentToClassDTO);
    
        if (duplicatedClassEnrollment) {
            throw new StudentAlreadyEnrolledError();
        }
        
        if (!cls) {
            throw new ClassNotFoundError();
        }
        
        const classEnrollment = await this.classEnrollmentsRepository.create(enrollStudentToClassDTO);
        
        return classEnrollment;
    }
}