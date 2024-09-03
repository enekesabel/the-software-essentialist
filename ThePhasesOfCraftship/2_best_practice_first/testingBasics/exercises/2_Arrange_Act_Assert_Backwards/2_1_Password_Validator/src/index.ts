export class PasswordValidator {
    static Validate(password: string) {
      const errors = [];
  
      // Check if password length is valid
      if (password.length < 5 || password.length > 15) {
        errors.push({
          type: 'InvalidLengthError',
          message: 'Password must be between 5 and 15 characters long.'
        });
      }
  
      // If there are no errors, return a valid response
      if (errors.length === 0) {
        return {
          result: true,
          errors: []
        };
      }
  
      // Otherwise, return the errors
      return {
        result: false,
        errors: errors
      };
    }
  }