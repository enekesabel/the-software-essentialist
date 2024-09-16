import { Request, Response, NextFunction } from "express";
import { isUUID, parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateAssignmentDTO, isInvalidDTO } from "../dto";
import { ValidationError } from "../Errors";
import { AssignmentsService } from "../service";


export class AssignmentsController extends BaseController {

    constructor(private assignmentsService: AssignmentsService) {
        super();
    }

    protected setUpRoutes(): void {
        this.router.post('/', this.createAssignment.bind(this));
        this.router.get('/:id', this.getAssignmentById.bind(this));
    }

    async createAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const createAssignmentDTO = CreateAssignmentDTO.Create(req.body);
            if (isInvalidDTO(createAssignmentDTO)) {
                return next(new ValidationError());
            }
        
            const assignment = await this.assignmentsService.createAssignment(createAssignmentDTO);
        
            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (err) {
            next(err);
        }
    }

    async getAssignmentById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return next(new ValidationError());
            }
            const assignment = await this.assignmentsService.getAssignmentById(id);
        
            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (err) {
            next(err);
        }
    }
}
