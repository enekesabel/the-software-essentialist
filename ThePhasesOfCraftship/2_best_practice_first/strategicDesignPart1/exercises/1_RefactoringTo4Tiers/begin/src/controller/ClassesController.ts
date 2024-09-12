import { Router, Request, Response } from "express";
import { prisma } from "../database";
import { Errors } from "./Errors";
import { isMissingKeys, isUUID, parseForResponse } from "./utils";

export class ClassesController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/', this.createClass);
        this.router.get('/:id/assignments', this.getAssignments);
    }

    async createClass(req: Request, res: Response) {
        try {
            if (isMissingKeys(req.body, ['name'])) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }
        
            const { name } = req.body;
        
            const cls = await prisma.class.create({
                data: {
                    name
                }
            });
        
            res.status(201).json({ error: undefined, data: parseForResponse(cls), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    async getAssignments(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if(!isUUID(id)) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }

            // check if class exists
            const cls = await prisma.class.findUnique({
                where: {
                    id
                }
            });

            if (!cls) {
                return res.status(404).json({ error: Errors.ClassNotFound, data: undefined, success: false });
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
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

}
