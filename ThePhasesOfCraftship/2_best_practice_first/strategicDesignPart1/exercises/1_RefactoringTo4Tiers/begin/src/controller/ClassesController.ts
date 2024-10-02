import { Request, Response, NextFunction } from "express";
import { BaseController } from "./BaseController";
import { CreateClassDTO, isInvalidDTO } from "../dto";
import { ValidationError } from "../Errors";
import { ClassesService } from "../service";
import { isUUID } from "./utils";

export class ClassesController extends BaseController {

    constructor(private classesService: ClassesService) {
        super();
    }

    protected setUpRoutes(): void {
        this.router.post('/', this.createClass.bind(this));
        this.router.get('/:id/assignments', this.getClassAssignments.bind(this));
    }

    async createClass(req: Request, res: Response, next: NextFunction) {
        try {
            const classDTO = CreateClassDTO.Create(req.body);
            if (isInvalidDTO(classDTO)) {
                throw new ValidationError();
            }
            
            const cls = await this.classesService.createClass(classDTO);
            return this.sendSuccessResponse({status: 201, data: cls, res});
        } catch (error) {
            next(error);
        }
    }

    async getClassAssignments(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                throw new ValidationError();
            }

            const assignments = await this.classesService.getAssignments(id);

            return this.sendSuccessResponse({status: 200, data: assignments, res});
        } catch (error) {
            next(error);
        }
    }
}
