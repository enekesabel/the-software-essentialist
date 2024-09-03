export type ValidationError = {
    type: string;
    message: string;
};

export type ValidationResult = {
    result: boolean;
    errors: ReadonlyArray<ValidationError>;
};

class ValidationResultImpl implements ValidationResult {
    readonly result: boolean;
    readonly errors: ReadonlyArray<ValidationError>;

    constructor(result: boolean, errors: ValidationError[] = []) {
        this.result = result;
        this.errors = errors;
    }

    combine(other: ValidationResultImpl): ValidationResultImpl {
        const combinedErrors = [...this.errors, ...other.errors];
        const allPass = this.result && other.result;

        return new ValidationResultImpl(allPass, combinedErrors);
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
                    type: 'InvalidLengthError',
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
                    type: 'NoDigitError',
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
                    type: 'NoUpperCaseCharacterError',
                    message: 'Password must contain at least one upper case letter.'
                }
            ]);
        }
        return new ValidationResultImpl(true);
    }
}
