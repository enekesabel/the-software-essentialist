import { prisma } from "../database";
import { EnrollStudentToClassDTO } from "../dto";
import { StudentNotFoundError, StudentAlreadyEnrolledError, ClassNotFoundError } from "../Errors";

export class ClassEnrollmentsService {
    async enrollStudentToClass(enrollStudentToClassDTO: EnrollStudentToClassDTO) {
    
        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: enrollStudentToClassDTO.studentId
            }
        });
        
        if (!student) {
            throw new StudentNotFoundError();
        }
    
        // check if class exists
        const cls = await prisma.class.findUnique({
            where: {
                id: enrollStudentToClassDTO.classId
            }
        });
    
        // check if student is already enrolled in class
        const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
            where: enrollStudentToClassDTO
        });
    
        if (duplicatedClassEnrollment) {
            throw new StudentAlreadyEnrolledError();
        }
        
        if (!cls) {
            throw new ClassNotFoundError();
        }
        
        const classEnrollment = await prisma.classEnrollment.create({
            data: enrollStudentToClassDTO
        });
        
        return classEnrollment;
    }
}