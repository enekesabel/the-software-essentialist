import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";
import { parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateStudentAssignmentDTO, GradeStudentAssignmentDTO, isInvalidDTO } from "../dto";
import { AssignmentNotFoundError, ServerError, StudentNotFoundError, ValidationError } from "../Errors";

export class StudentAssignmentsController extends BaseController {
    protected setUpRoutes(): void {
        this.router.post('/', this.create);
        this.router.post('/submit', this.submit);
        this.router.post('/grade', this.grade);
    }
    
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createStudentAssignmentDTO = CreateStudentAssignmentDTO.Create(req.body);
            if (isInvalidDTO(createStudentAssignmentDTO)) {
                return next(new ValidationError());
            }
        
            const { studentId, assignmentId } = createStudentAssignmentDTO;
        
            // check if student exists
            const student = await prisma.student.findUnique({
                where: {
                    id: studentId
                }
            });
        
            if (!student) {
                return next(new StudentNotFoundError());
            }
        
            // check if assignment exists
            const assignment = await prisma.assignment.findUnique({
                where: {
                    id: assignmentId
                }
            });
        
            if (!assignment) {
                return next(new AssignmentNotFoundError());
            }
        
            const studentAssignment = await prisma.studentAssignment.create({
                data: {
                    studentId,
                    assignmentId,
                }
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
        } catch (error) {
            next(error);
        }
    }

    
    async submit(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;

            if (id === undefined) {
                return next(new ValidationError());
            }

            
            // check if student assignment exists
            const studentAssignment = await prisma.studentAssignment.findUnique({
                where: {
                    id
                }
            });

            if (!studentAssignment) {
                return next(new AssignmentNotFoundError());
            }

            const studentAssignmentUpdated = await prisma.studentAssignment.update({
                where: {
                    id
                },
                data: {
                    status: 'submitted'
                }
            });

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    }

   
    async grade(req: Request, res: Response, next: NextFunction) {
        try {
            const gradeStudentAssignmentDTO = GradeStudentAssignmentDTO.Create(req.body);
            if (isInvalidDTO(gradeStudentAssignmentDTO)) {
                return next(new ValidationError());
            }
            
            const { id, grade } = gradeStudentAssignmentDTO;

            // check if student assignment exists
            const studentAssignment = await prisma.studentAssignment.findUnique({
                where: {
                    id
                }
            });
        
            if (!studentAssignment) {
                return next(new AssignmentNotFoundError());
            }
        
            const studentAssignmentUpdated = await prisma.studentAssignment.update({
                where: {
                    id
                },
                data: {
                    grade,
                }
            });
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    }
}

