export class PasswordValidator {
    static Validate(password: string) {
        return {
            result: false,
            errors: [
                {
                    type: 'InvalidLengthError', 
                    message: 'Password must be between 5 and 15 characters long.'
                }
            ]
        }
    }
}