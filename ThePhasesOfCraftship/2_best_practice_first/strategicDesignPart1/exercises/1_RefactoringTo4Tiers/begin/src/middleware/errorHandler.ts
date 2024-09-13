import { Request, Response, NextFunction } from "express";
import { ServerError } from "../Errors";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        if(err instanceof ServerError) {
            return res.status(500).json({ error: err.message, data: undefined, success: false });
        }
        return res.status(500).json({ error: new ServerError().message, data: undefined, success: false });
    } else {
        next();
    }
}