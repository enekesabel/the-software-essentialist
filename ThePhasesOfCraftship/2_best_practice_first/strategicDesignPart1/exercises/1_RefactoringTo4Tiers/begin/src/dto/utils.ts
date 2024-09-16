import { BaseError } from "../Errors";

export class DTOValidationError extends BaseError {}

export function isInvalidDTO<T>(dto: any): dto is DTOValidationError {
    return dto instanceof DTOValidationError;
}