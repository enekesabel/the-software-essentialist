import { Request, Response } from "express";
import { prisma } from "../database";
import { isUUID, parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateStudentDTO, isInvalidDTO } from "../dto";
import { StudentsService } from "../service";
import { ValidationError, ServerError, StudentNotFoundError } from "../Errors";

export class StudentsController extends BaseController {

    constructor(private studentsService: StudentsService) {
        super();
    }
   
    protected setUpRoutes(): void {
        this.router.post('/', this.create);
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getById);
        this.router.get('/:id/assignments', this.getAssignments);
        this.router.get('/:id/grades', this.getGrades);
    }

    async create (req: Request, res: Response) {
        try {
            const createStudentDTO = CreateStudentDTO.Create(req.body);
            if (isInvalidDTO(createStudentDTO)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }
    
            const student = await this.studentsService.createStudent(createStudentDTO);

            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

    async getAll (req: Request, res: Response) {
        try {
            const students = this.studentsService.getAllStudents();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }

            const student = this.studentsService.getStudentById(id);
        
            if (!student) {
                return res.status(404).json({ error: new StudentNotFoundError().message, data: undefined, success: false });
            }
        
            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

    async getAssignments(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }
    
            // check if student exists
            const student = await prisma.student.findUnique({
                where: {
                    id
                }
            });
    
            if (!student) {
                return res.status(404).json({ error: new StudentNotFoundError().message, data: undefined, success: false });
            }
    
            const studentAssignments = await prisma.studentAssignment.findMany({
                where: {
                    studentId: id,
                    status: 'submitted'
                },
                include: {
                    assignment: true
                },
            });
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

    async getGrades(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }
    
            // check if student exists
            const student = await prisma.student.findUnique({
                where: {
                    id
                }
            });
    
            if (!student) {
                return res.status(404).json({ error: new StudentNotFoundError().message, data: undefined, success: false });
            }
    
            const studentAssignments = await prisma.studentAssignment.findMany({
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
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }
}