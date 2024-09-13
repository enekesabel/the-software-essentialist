import { Request, Response, NextFunction } from "express";
import { isUUID, parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateStudentDTO, isInvalidDTO } from "../dto";
import { StudentsService } from "../service";
import { ValidationError, StudentNotFoundError } from "../Errors";

export class StudentsController extends BaseController {

    constructor(private studentsService: StudentsService) {
        super();
    }
   
    protected setUpRoutes(): void {
        this.router.post('/', this.createStudent.bind(this));
        this.router.get('/', this.getAllStudents.bind(this));
        this.router.get('/:id', this.getStudentById.bind(this));
        this.router.get('/:id/assignments', this.getStudentAssignments.bind(this));
        this.router.get('/:id/grades', this.getStudentGrades.bind(this));
    }

    async createStudent (req: Request, res: Response, next: NextFunction) {
        try {
            const createStudentDTO = CreateStudentDTO.Create(req.body);
            if (isInvalidDTO(createStudentDTO)) {
                throw new ValidationError();
            }
    
            const student = await this.studentsService.createStudent(createStudentDTO);

            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    }

    async getAllStudents (req: Request, res: Response, next: NextFunction) {
        try {
            const students = await this.studentsService.getAllStudents();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            next(error);
        }
    }

    async getStudentById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                throw new ValidationError();
            }

            const student = await this.studentsService.getStudentById(id);
        
            if (!student) {
                throw new StudentNotFoundError();
            }
        
            res.status(200).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            next(error);
        }
    }

    async getStudentAssignments(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                throw new ValidationError();
            }
            
            const studentAssignments = await this.studentsService.getStudentAssignments(id);
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error);
        }
    }

    async getStudentGrades(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                throw new ValidationError();
            }
    
            const studentAssignments = await this.studentsService.getStudentGrades(id);
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            next(error);
        }
    }
}