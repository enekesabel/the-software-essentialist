type ValidationError = {
    type: string;
    message: string;
};

type ValidationResult = {
    result: boolean;
    errors: ValidationError[];
};

export class PasswordValidator {
    static Validate(password: string): ValidationResult {
        const errors: ValidationError[] = [];

        // Validate length
        if (password.length < 5 || password.length > 15) {
            errors.push({
                type: 'InvalidLengthError',
                message: 'Password must be between 5 and 15 characters long.'
            });
        }

        // Validate presence of at least one digit
        const hasDigit = /\d/.test(password);
        if (!hasDigit) {
            errors.push({
                type: 'NoDigitError',
                message: 'Password must contain at least one digit.'
            });
        }

        // Result based on whether any errors were found
        const result = errors.length === 0;

        return {
            result,
            errors
        };
    }
}