export type ValidationError = {
    type: string;
    message: string;
};

export type ValidationResult = {
    result: boolean;
    errors: ValidationError[];
};

export class PasswordValidator {
    static Validate(password: string): ValidationResult {
        
        const lengthValidation = this.ValidateLength(password);
        const digitValidation = this.ValidateDigit(password);
        const upperCaseValidation = this.ValidateUpperCase(password);

        return this.CombineResults(lengthValidation, digitValidation, upperCaseValidation);
    }

    private static ValidateLength(password: string): ValidationResult {
        if (password.length < 5 || password.length > 15) {
            return {
                result: false,
                errors: [
                    {
                        type: 'InvalidLengthError',
                        message: 'Password must be between 5 and 15 characters long.'
                    }
                ]
            };
        }
        return { result: true, errors: [] };
    }

    private static ValidateDigit(password: string): ValidationResult {
        if (!/\d/.test(password)) {
            return {
                result: false,
                errors: [
                    {
                        type: 'NoDigitError',
                        message: 'Password must contain at least one digit.'
                    }
                ]
            };
        }
        return { result: true, errors: [] };
    }

    private static ValidateUpperCase(password: string): ValidationResult {
        if (!/[A-Z]/.test(password)) {
            return {
                result: false,
                errors: [
                    {
                        type: 'NoUpperCaseCharacterError',
                        message: 'Password must contain at least one upper case letter.'
                    }
                ]
            };
        }
        return { result: true, errors: [] };
    }

    private static CombineResults(...results: ValidationResult[]): ValidationResult {
        const combinedErrors: ValidationError[] = [];
        let allPass = true;

        for (const result of results) {
            if (!result.result) {
                allPass = false;
                combinedErrors.push(...result.errors);
            }
        }

        return {
            result: allPass,
            errors: combinedErrors
        };
    }
}
