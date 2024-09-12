import { Router } from "express";

export abstract class BaseController {
    readonly router: Router;

    constructor() {
        this.router = Router();
        this.setUpRoutes();
    }

    protected abstract setUpRoutes(): void;
}