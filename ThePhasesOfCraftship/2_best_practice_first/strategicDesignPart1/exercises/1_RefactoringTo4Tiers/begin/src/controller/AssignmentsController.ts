import { Request, Response } from "express";
import { prisma } from "../database";
import { isUUID, parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateAssignmentDTO, isInvalidDTO } from "../dto";
import { ValidationError, ServerError, AssignmentNotFoundError } from "../Errors";

export class AssignmentsController extends BaseController {

    protected setUpRoutes(): void {
        this.router.post('/', this.create);
        this.router.get('/:id', this.getById);
    }

    async create(req: Request, res: Response) {
        try {
            const createAssignmentDTO = CreateAssignmentDTO.Create(req.body);
            if (isInvalidDTO(createAssignmentDTO)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }
        
            const assignment = await prisma.assignment.create({
                data: createAssignmentDTO
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(assignment), success: true });
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
                return res.status(404).json({ error: new AssignmentNotFoundError().message, data: undefined, success: false });
            }
        
            res.status(200).json({ error: undefined, data: parseForResponse(assignment), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

}

