import { Request, Response, NextFunction } from "express";
import { parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { EnrollStudentToClassDTO, isInvalidDTO } from "../dto";
import { ValidationError } from "../Errors";
import { ClassEnrollmentsService } from "../service";

export class ClassEnrollmentsController extends BaseController {
    constructor(private classEnrollmentsService: ClassEnrollmentsService) {
        super();
    }

    protected setUpRoutes(): void {
        this.router.post('/', this.enrollStudentToClass.bind(this));
    }

    async enrollStudentToClass(req: Request, res: Response, next: NextFunction) {
        try {
            const enrollStudentToClassDTO = EnrollStudentToClassDTO.Create(req.body);
            if (isInvalidDTO(enrollStudentToClassDTO)) {
                throw new ValidationError();
            }
            const classEnrollment = await this.classEnrollmentsService.enrollStudentToClass(enrollStudentToClassDTO);
            res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
        } catch (error) {
            next(error);
        }
    }

}
