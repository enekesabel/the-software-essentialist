import { Router, Response } from "express";
import { ResponseBuilder } from "./utils";

export abstract class BaseController {
    readonly router: Router;

    constructor() {
        this.router = Router();
        this.setUpRoutes();
    }

    protected abstract setUpRoutes(): void;

    protected sendSuccessResponse<T>({status, data, res}: {status: number, data: T, res: Response}) {
        return new ResponseBuilder<T>(res).status(status).data(data).build();
    }
}