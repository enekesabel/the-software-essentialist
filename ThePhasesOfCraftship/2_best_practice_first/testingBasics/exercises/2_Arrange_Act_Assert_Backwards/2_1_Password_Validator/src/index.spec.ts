import { PasswordValidator, ValidationResult, ValidationError, ValidationErrorType } from ".";

// Utility function for asserting successful validation
function expectToPass(validationResult: ValidationResult) {
  expect(validationResult.result).toBe(true);
  expect(validationResult.errors).toHaveLength(0);
}

// Utility function for asserting failed validation
function expectToFail(validationResult: ValidationResult, ...errors: ValidationError[]) {
  expect(validationResult.result).toBe(false);
  expect(validationResult.errors).toHaveLength(errors.length);
  expect(validationResult.errors).toMatchObject(errors);
}

describe('password validator', () => {

  it('Should list all the occurring validation errors', () => {

    const password = '';

    const validationResult = PasswordValidator.Validate(password);

    expectToFail(validationResult,
      { type: ValidationErrorType.InvalidLengthError, message: 'Password must be between 5 and 15 characters long.' },
      { type: ValidationErrorType.NoDigitError, message: 'Password must contain at least one digit.' },
      { type: ValidationErrorType.NoUpperCaseCharacterError, message: 'Password must contain at least one upper case letter.' }
    );
  });

  describe('The password must be between 5 and 15 characters long', () => {

    // Parameterized tests for invalid length cases
    test.each([
      'thePhysical1234567',  // exceeds 15 characters
      'Abc1',                 // exactly 4 characters (one below the limit)
      'Abcdefghijklmno1'     // exactly 16 characters (one over the limit)
    ])('"%s" returns a false-y response due to invalid length', (password) => {

      const validationResult = PasswordValidator.Validate(password);

      expectToFail(validationResult,
        { type: ValidationErrorType.InvalidLengthError, message: 'Password must be between 5 and 15 characters long.' }
      );
    });

    // Parameterized test for valid length cases
    test.each([
      'Abcd1',               // exactly 5 characters (valid edge case)
      'Abcdefghij12345',     // exactly 15 characters (valid edge case)
      'theValid1',           // within the valid length range
    ])('"%s" returns a truthy response because it is within the valid length range', (password) => {

      const validationResult = PasswordValidator.Validate(password);

      expectToPass(validationResult);
    });

  });

  describe('Password must contain at least one digit', () => {

    test('"maxwellTheBe" returns a false-y response because it lacks a digit', () => {

      const password = 'maxwellTheBe';

      const validationResult = PasswordValidator.Validate(password);

      expectToFail(validationResult,
        { type: ValidationErrorType.NoDigitError, message: 'Password must contain at least one digit.' }
      );
    });

    test('"password1" returns a truthy response because it contains a digit', () => {

      const password = 'Password1';

      const validationResult = PasswordValidator.Validate(password);

      expectToPass(validationResult);
    });

  });

  describe('Password must contain at least one uppercase letter', () => {

    test('"maxwell1_c" returns a false-y response because it lacks an uppercase letter', () => {

      const password = 'maxwell1_c';

      const validationResult = PasswordValidator.Validate(password);

      expectToFail(validationResult,
        { type: ValidationErrorType.NoUpperCaseCharacterError, message: 'Password must contain at least one upper case letter.' }
      );
    });
    
    test('"Password1" returns a truthy response because it contains an uppercase letter', () => {

      const password = 'Password1';

      const validationResult = PasswordValidator.Validate(password);

      expectToPass(validationResult);
    });

  });
});
