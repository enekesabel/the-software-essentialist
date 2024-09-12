export class DTOValidationError extends Error {}

export function isInvalidDTO<T>(dto: any): dto is DTOValidationError {
    return dto instanceof DTOValidationError;
}