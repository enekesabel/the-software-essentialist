import { Request, Response, NextFunction } from "express";
import { parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateStudentAssignmentDTO, GradeStudentAssignmentDTO, isInvalidDTO } from "../dto";
import { ValidationError } from "../Errors";
import { StudentAssignmentsService } from "../service";

export class StudentAssignmentsController extends BaseController {

    constructor(private studentAssignmentsService: StudentAssignmentsService) {
        super();
    }

    protected setUpRoutes(): void {
        this.router.post('/', this.createStudentAssignment.bind(this));
        this.router.post('/submit', this.submitStudentAssignment.bind(this));
        this.router.post('/grade', this.gradeStudentAssignment.bind(this));
    }

    async createStudentAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const createStudentAssignmentDTO = CreateStudentAssignmentDTO.Create(req.body);
            if (isInvalidDTO(createStudentAssignmentDTO)) {
                return next(new ValidationError());
            }

            const studentAssignment = await this.studentAssignmentsService.createStudentAssignment(createStudentAssignmentDTO);

            res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
        } catch (error) {
            next(error);
        }
    }

    async submitStudentAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;

            if (id === undefined) {
                return next(new ValidationError());
            }

            const studentAssignmentUpdated = await this.studentAssignmentsService.submitStudentAssignment(id);

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    }

    async gradeStudentAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const gradeStudentAssignmentDTO = GradeStudentAssignmentDTO.Create(req.body);
            if (isInvalidDTO(gradeStudentAssignmentDTO)) {
                return next(new ValidationError());
            }

            const studentAssignmentUpdated = await this.studentAssignmentsService.gradeStudentAssignment(gradeStudentAssignmentDTO);

            res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
        } catch (error) {
            next(error);
        }
    }
}

