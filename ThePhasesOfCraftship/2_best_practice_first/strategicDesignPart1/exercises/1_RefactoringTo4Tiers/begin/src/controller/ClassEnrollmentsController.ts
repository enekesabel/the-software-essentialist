import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";
import { parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { EnrollStudentToClassDTO, isInvalidDTO } from "../dto";
import { ValidationError, StudentAlreadyEnrolledError, ClassNotFoundError, StudentNotFoundError } from "../Errors";

export class ClassEnrollmentsController extends BaseController {

    protected setUpRoutes(): void {
        this.router.post('/', this.enrollStudentToClass);
    }

    async enrollStudentToClass(req: Request, res: Response, next: NextFunction) {
        try {
            const enrollStudentToClassDTO = EnrollStudentToClassDTO.Create(req.body);
            if (isInvalidDTO(enrollStudentToClassDTO)) {
                return next(new ValidationError());
            }
        
            // check if student exists
            const student = await prisma.student.findUnique({
                where: {
                    id: enrollStudentToClassDTO.studentId
                }
            });
        
            if (!student) {
                return next(new StudentNotFoundError());
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
                return next(new StudentAlreadyEnrolledError());
            }
        
            if (!cls) {
                return next(new ClassNotFoundError());
            }
        
            const classEnrollment = await prisma.classEnrollment.create({
                data: enrollStudentToClassDTO
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            next(error);
        }
     
    }

}

