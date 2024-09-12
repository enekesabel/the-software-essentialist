import { Router, Request, Response } from "express";
import { prisma } from "../database";
import { Errors } from "./Errors";
import { isMissingKeys, parseForResponse } from "./utils";

export class StudentsController {

    readonly router: Router;

    constructor() {
        this.router = Router();
        this.router.post('/', this.create);
        this.router.get('/', this.getAll);
    }

    async create (req: Request, res: Response) {
        try {
            if (isMissingKeys(req.body, ['name'])) {
                return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
            }
    
            const { name } = req.body;
    
            const student = await prisma.student.create({
                data: {
                    name
                }
            });
    
            res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

    async getAll (req: Request, res: Response) {
        try {
            const students = await prisma.student.findMany({
                include: {
                    classes: true,
                    assignments: true,
                    reportCards: true
                }, 
                orderBy: {
                    name: 'asc'
                }
            });
            res.status(200).json({ error: undefined, data: parseForResponse(students), success: true });
        } catch (error) {
            res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
        }
    }

}