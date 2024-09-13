import { Request, Response, NextFunction } from "express";
import { prisma } from "../database";
import { isUUID, parseForResponse } from "./utils";
import { BaseController } from "./BaseController";
import { CreateClassDTO, isInvalidDTO } from "../dto";
import { ValidationError, ClassNotFoundError } from "../Errors";

export class ClassesController extends BaseController {

    protected setUpRoutes(): void {
        this.router.post('/', this.create);
        this.router.get('/:id/assignments', this.getAssignments);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const classDTO = CreateClassDTO.Create(req.body.name);
            if (isInvalidDTO(classDTO)) {
                return next(new ValidationError());
            }
        
            const cls = await prisma.class.create({
                data: classDTO
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
        } catch (error) {
            next(error);
        }
    }

    async getAssignments(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                throw new ValidationError();
            }

            // check if class exists
            const cls = await prisma.class.findUnique({
                where: {
                    id
                }
            });

            if (!cls) {
                throw new ClassNotFoundError();
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
            next(error);
        }
    }

}

