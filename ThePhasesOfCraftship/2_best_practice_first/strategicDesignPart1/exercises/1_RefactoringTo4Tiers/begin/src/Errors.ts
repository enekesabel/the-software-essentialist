// https://stackoverflow.com/questions/41102060/typescript-extending-error-class/48342359#48342359
export abstract class BaseError extends Error {
    constructor(message?: string) {
        // 'Error' breaks prototype chain here
        super(message); 
    
        // restore prototype chain   
        const actualProto = new.target.prototype;
    
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        }
        else { 
            // @ts-ignore
            this.__proto__ = actualProto; 
        } 
      }
};

export class ValidationError extends BaseError {
    constructor() {
        super('ValidationError');
    }
}

export class StudentNotFoundError extends BaseError {
    constructor() {
        super('StudentNotFound');
    }
}

export class ClassNotFoundError extends BaseError {
    constructor() {
        super('ClassNotFound');
    }
}

export class AssignmentNotFoundError extends BaseError {
    constructor() {
        super('AssignmentNotFound');
    }
}

export class ServerError extends BaseError {
    constructor() {
        super('ServerError');
    }
}

export class ClientError extends BaseError {
    constructor() {
        super('ClientError');
    }
}

export class StudentAlreadyEnrolledError extends BaseError {
    constructor() {
        super('StudentAlreadyEnrolled');
    }
}

