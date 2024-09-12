export class ValidationError extends Error {
    constructor() {
        super('ValidationError');
    }
}

export class StudentNotFoundError extends Error {
    constructor() {
        super('StudentNotFound');
    }
}

export class ClassNotFoundError extends Error {
    constructor() {
        super('ClassNotFound');
    }
}

export class AssignmentNotFoundError extends Error {
    constructor() {
        super('AssignmentNotFound');
    }
}

export class ServerError extends Error {
    constructor() {
        super('ServerError');
    }
}

export class ClientError extends Error {
    constructor() {
        super('ClientError');
    }
}

export class StudentAlreadyEnrolledError extends Error {
    constructor() {
        super('StudentAlreadyEnrolled');
    }
}

