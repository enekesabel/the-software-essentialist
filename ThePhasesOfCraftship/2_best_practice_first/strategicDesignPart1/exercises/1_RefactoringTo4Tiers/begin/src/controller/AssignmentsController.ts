import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";
import { isUUID, parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateAssignmentDTO, isInvalidDTO } from "../dto";
import { ValidationError, AssignmentNotFoundError } from "../Errors";

export class AssignmentsController extends BaseController {

    protected setUpRoutes(): void {
        this.router.post('/', this.create);
        this.router.get('/:id', this.getById);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createAssignmentDTO = CreateAssignmentDTO.Create(req.body);
            if (isInvalidDTO(createAssignmentDTO)) {
                return next(new ValidationError());
            }
        
            const assignment = await prisma.assignment.create({
                data: createAssignmentDTO
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (err) {
            next(err);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return next(new ValidationError());
            }
            const assignment = await prisma.assignment.findUnique({
                include: {
                    class: true,
                    studentTasks: true
                },
                where: {
                    id
                }
            });
        
            if (!assignment) {
                return next(new AssignmentNotFoundError());
            }
        
            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (err) {
            next(err);
        }
    }

}