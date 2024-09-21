export type ValidationError = {
    type: ValidationErrorType;
    message: string;
};

export type ValidationResult = {
    result: boolean;
    errors: ReadonlyArray<ValidationError>;
};

export enum ValidationErrorType {
    InvalidLengthError,
    NoDigitError,
    NoUpperCaseCharacterError
}

class ValidationResultImpl implements ValidationResult {
    readonly result: boolean;
    readonly errors: ReadonlyArray<ValidationError>;

    constructor(result: true);
    constructor(result: false, errors: ValidationError[]);
    constructor(result: boolean, errors: ValidationError[] = []) {
        this.result = result;
        this.errors = errors;
    }

    combine(other: ValidationResultImpl): ValidationResultImpl {
        if(this.result && other.result){
            return new ValidationResultImpl(true);
        }

        return new ValidationResultImpl(false, [...this.errors, ...other.errors]);
    }
}

export class PasswordValidator {
    static Validate(password: string): ValidationResult {
        return this.ValidateLength(password).
        combine(this.ValidateDigit(password)).
        combine(this.ValidateUpperCase(password));
    }

    private static ValidateLength(password: string): ValidationResultImpl {
        if (password.length < 5 || password.length > 15) {
            return new ValidationResultImpl(false, [
                {
                    type: ValidationErrorType.InvalidLengthError,
                    message: 'Password must be between 5 and 15 characters long.'
                }
            ]);
        }
        return new ValidationResultImpl(true);
    }

    private static ValidateDigit(password: string): ValidationResultImpl {
        if (!/\d/.test(password)) {
            return new ValidationResultImpl(false, [
                {
                    type: ValidationErrorType.NoDigitError,
                    message: 'Password must contain at least one digit.'
                }
            ]);
        }
        return new ValidationResultImpl(true);
    }

    private static ValidateUpperCase(password: string): ValidationResultImpl {
        if (!/[A-Z]/.test(password)) {
            return new ValidationResultImpl(false, [
                {
                    type: ValidationErrorType.NoUpperCaseCharacterError,
                    message: 'Password must contain at least one upper case letter.'
                }
            ]);
        }
        return new ValidationResultImpl(true);
    }
}
