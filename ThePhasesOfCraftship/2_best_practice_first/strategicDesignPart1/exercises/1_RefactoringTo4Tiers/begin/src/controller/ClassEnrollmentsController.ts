import { Request, Response } from "express";
import { prisma } from "../database";
import { parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { EnrollStudentToClassDTO, isInvalidDTO } from "../dto";
import { ValidationError, ServerError, StudentAlreadyEnrolledError, ClassNotFoundError, StudentNotFoundError } from "../Errors";

export class ClassEnrollmentsController extends BaseController {

    protected setUpRoutes(): void {
        this.router.post('/', this.enrollStudentToClass);
    }

    async enrollStudentToClass(req: Request, res: Response) {
        try {
            const enrollStudentToClassDTO = EnrollStudentToClassDTO.Create(req.body);
            if (isInvalidDTO(enrollStudentToClassDTO)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }
        
            // check if student exists
            const student = await prisma.student.findUnique({
                where: {
                    id: enrollStudentToClassDTO.studentId
                }
            });
        
            if (!student) {
                return res.status(404).json({ error: new StudentNotFoundError().message, data: undefined, success: false });
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
                return res.status(400).json({ error: new StudentAlreadyEnrolledError().message, data: undefined, success: false });
            }
        
            if (!cls) {
                return res.status(404).json({ error: new ClassNotFoundError().message, data: undefined, success: false });
            }
        
            const classEnrollment = await prisma.classEnrollment.create({
                data: enrollStudentToClassDTO
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
     
    }

}
