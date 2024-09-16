import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { CreateStudentDTO, isInvalidDTO } from "../dto";
import { StudentsService } from "../service";
import { ValidationError } from "../Errors";
import { isUUID } from "./utils";

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

            return this.sendSuccessResponse({status: 201, data: student, res});
        } catch (error) {
            next(error);
        }
    }

    async getAllStudents (req: Request, res: Response, next: NextFunction) {
        try {
            const students = await this.studentsService.getAllStudents();

            return this.sendSuccessResponse({status: 200, data: students, res});
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
        
            return this.sendSuccessResponse({status: 200, data: student, res});
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
        
            return this.sendSuccessResponse({status: 200, data: studentAssignments, res});
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
        
            return this.sendSuccessResponse({status: 200, data: studentAssignments, res});
        } catch (error) {
            next(error);
        }
    }
}
