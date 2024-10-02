import { Request, Response, NextFunction } from "express";
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

            return this.sendSuccessResponse({status: 201, data: studentAssignment, res});
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

            return this.sendSuccessResponse({status: 200, data: studentAssignmentUpdated, res});
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

            return this.sendSuccessResponse({status: 200, data: studentAssignmentUpdated, res});
        } catch (error) {
            next(error);
        }
    }
}