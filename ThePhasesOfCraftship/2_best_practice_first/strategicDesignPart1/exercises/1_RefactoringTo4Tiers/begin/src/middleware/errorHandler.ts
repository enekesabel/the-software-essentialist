import { Request, Response, NextFunction } from "express";
import { AssignmentNotFoundError, BaseError, ClassNotFoundError, ServerError, StudentAlreadyEnrolledError, StudentNotFoundError, ValidationError } from "../Errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        if(err instanceof StudentAlreadyEnrolledError) {
            return res.status(400).json({ error: err.message, data: undefined, success: false });
        }
        if(err instanceof AssignmentNotFoundError){
            return res.status(404).json({ error: err.message, data: undefined, success: false });
        }
        if(err instanceof StudentNotFoundError) {
            return res.status(404).json({ error: err.message, data: undefined, success: false });
        }
        if(err instanceof ClassNotFoundError) {
            return res.status(404).json({ error: err.message, data: undefined, success: false });
        }
        if(err instanceof ValidationError) {
            return res.status(400).json({ error: err.message, data: undefined, success: false });
        }
        if(err instanceof BaseError) {
            return res.status(500).json({ error: err.message, data: undefined, success: false });
        }
        return res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
    } else {
        next();
    }
}