import { Response } from "express";

export function isUUID(id: string) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
}

function parseForResponse(data: unknown) {
    return JSON.parse(JSON.stringify(data));
}

export class ResponseBuilder<T> {
    private errorMessage: string | undefined;
    private dataToSend: T | undefined;
    private response: Response;
    private success: boolean | undefined;
    constructor(response: Response) {
        this.response = response;
    }

    error(error: string) {
        this.errorMessage = error;
        this.success = false;
        return this;
    }

    data(data: T) {
        this.dataToSend = data;
        this.success = true;
        this.errorMessage = undefined;
        return this;
    }

    status(status: number) {
        this.response.status(status);
        return this;
    }
    
    build() {
        return this.response.json({ error: this.errorMessage, data: this.success? parseForResponse(this.dataToSend) : undefined, success: this.success });
    }
}