import { Request, Response } from "express";
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
        this.router.post('/', this.createStudent);
        this.router.get('/', this.getAllStudents);
        this.router.get('/:id', this.getStudentById);
        this.router.get('/:id/assignments', this.getStudentAssignments);
        this.router.get('/:id/grades', this.getStudentGrades);
    }

    async createStudent (req: Request, res: Response) {
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

    async getAllStudents (req: Request, res: Response) {
        try {
            const students = this.studentsService.getAllStudents();
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

    async getStudentById(req: Request, res: Response) {
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

    async getStudentAssignments(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }
            
            const studentAssignments = this.studentsService.getStudentAssignments(id);
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {

            if(error instanceof StudentNotFoundError) {
                return res.status(404).json({ error: error.message, data: undefined, success: false });
            }

            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

    async getStudentGrades(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }
    
            const studentAssignments = this.studentsService.getStudentGrades(id);
        
            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignments), success: true });
        } catch (error) {
            if(error instanceof StudentNotFoundError) {
                return res.status(404).json({ error: error.message, data: undefined, success: false });
            }
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }
}