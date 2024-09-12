import { Request, Response } from "express";
import { prisma } from "../database";
import { Errors } from "./Errors";
import { parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { EnrollStudentToClassDTO, isInvalidDTO } from "../dto";

export class ClassEnrollmentsController extends BaseController {

    protected setUpRoutes(): void {
        this.router.post('/', this.enrollStudentToClass);
    }

    async enrollStudentToClass(req: Request, res: Response) {
        try {
            const enrollStudentToClassDTO = EnrollStudentToClassDTO.Create(req.body);
            if (isInvalidDTO(enrollStudentToClassDTO)) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }
        
            // check if student exists
            const student = await prisma.student.findUnique({
                where: {
                    id: enrollStudentToClassDTO.studentId
                }
            });
        
            if (!student) {
                return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
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
                return res.status(400).json({ error: Errors.StudentAlreadyEnrolled, data: undefined, success: false });
            }
        
            if (!cls) {
                return res.status(404).json({ error: Errors.ClassNotFound, data: undefined, success: false });
            }
        
            const classEnrollment = await prisma.classEnrollment.create({
                data: enrollStudentToClassDTO
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
     
    }

}
