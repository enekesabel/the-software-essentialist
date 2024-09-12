import { Request, Response } from "express";
import { prisma } from "../database";
import { isUUID, parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateClassDTO, isInvalidDTO } from "../dto";
import { ValidationError, ServerError, ClassNotFoundError } from "../Errors";

export class ClassesController extends BaseController {

    protected setUpRoutes(): void {
        this.router.post('/', this.create);
        this.router.get('/:id/assignments', this.getAssignments);
    }

    async create(req: Request, res: Response) {
        try {
            const classDTO = CreateClassDTO.Create(req.body.name);
            if (isInvalidDTO(classDTO)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }
        
            const cls = await prisma.class.create({
                data: classDTO
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

    async getAssignments(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: new ValidationError().message, data: undefined, success: false });
            }

            // check if class exists
            const cls = await prisma.class.findUnique({
                where: {
                    id
                }
            });

            if (!cls) {
                return res.status(404).json({ error: new ClassNotFoundError().message, data: undefined, success: false });
            }

            const assignments = await prisma.assignment.findMany({
                where: {
                    classId: id
                },
                include: {
                    class: true,
                    studentTasks: true
                }
            });
        
            res.status(200).json({ error: undefined, data: parseForResponse(assignments), success: true });
        } catch (error) {
            res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
        }
    }

}
