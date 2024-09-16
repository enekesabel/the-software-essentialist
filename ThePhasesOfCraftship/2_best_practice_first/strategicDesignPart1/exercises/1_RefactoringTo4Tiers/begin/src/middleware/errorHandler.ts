import { Request, Response, NextFunction } from "express";
import { AssignmentNotFoundError, BaseError, ClassNotFoundError, ServerError, StudentAlreadyEnrolledError, StudentNotFoundError, ValidationError } from "../Errors";
import { ResponseBuilder } from "../controller/utils";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        const responseBuilder = new ResponseBuilder(res);
        responseBuilder.error(err.message);
        if(err instanceof StudentAlreadyEnrolledError) {
            return responseBuilder.status(400).build();
        }
        if(err instanceof AssignmentNotFoundError){
            return responseBuilder.status(404).build();
        }
        if(err instanceof StudentNotFoundError) {
            return responseBuilder.status(404).build();
        }
        if(err instanceof ClassNotFoundError) {
            return responseBuilder.status(404).build();
        }
        if(err instanceof ValidationError) {
            return responseBuilder.status(400).build();
        }
        if(err instanceof BaseError) {
            return responseBuilder.status(500).build();
        }
        return responseBuilder.status(500).error(new ServerError().message).build();
    } else {
        next();
    }
}