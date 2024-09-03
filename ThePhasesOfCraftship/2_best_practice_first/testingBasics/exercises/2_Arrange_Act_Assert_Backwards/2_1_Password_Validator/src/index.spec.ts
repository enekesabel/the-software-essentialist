import { PasswordValidator, ValidationResult } from ".";

// Utility function for asserting successful validation
function expectToPass(validationResult: ValidationResult) {
    expect(validationResult.result).toBe(true);
    expect(validationResult.errors).toHaveLength(0);
}

describe('password validator', () => {

  it('Should list all the occurring validation errors', () => {
    // arrange
    const password = '';

    // act
    const validationResult = PasswordValidator.Validate(password);

    // assert
    expect(validationResult.result).toBe(false);
    expect(validationResult.errors).toHaveLength(3);
    expect(validationResult.errors[0].type).toBe('InvalidLengthError');
    expect(validationResult.errors[0].message).toBe('Password must be between 5 and 15 characters long.');
    expect(validationResult.errors[1].type).toBe('NoDigitError');
    expect(validationResult.errors[1].message).toBe('Password must contain at least one digit.');
    expect(validationResult.errors[2].type).toBe('NoUpperCaseCharacterError');
    expect(validationResult.errors[2].message).toBe('Password must contain at least one upper case letter.');
  });

  describe('The password must be between 5 and 15 characters long', () => {

    // Parameterized tests for invalid length cases
    test.each([
      'thePhysical1234567',  // exceeds 15 characters
      'Abc1',                 // exactly 4 characters (one below the limit)
      'Abcdefghijklmno1'     // exactly 16 characters (one over the limit)
    ])('"%s" returns a false-y response due to invalid length', (password) => {
      // act
      const validationResult = PasswordValidator.Validate(password);

      // assert
      expect(validationResult.result).toBe(false);
      expect(validationResult.errors).toHaveLength(1);
      expect(validationResult.errors[0].type).toBe('InvalidLengthError');
      expect(validationResult.errors[0].message).toBe('Password must be between 5 and 15 characters long.');
    });

    // Parameterized test for valid length cases
    test.each([
      'Abcd1',               // exactly 5 characters (valid edge case)
      'Abcdefghij12345',     // exactly 15 characters (valid edge case)
      'theValid1',  // within the valid length range
    ])('"%s" returns a truthy response because it is within the valid length range', (password) => {
      // act
      const validationResult = PasswordValidator.Validate(password);

      // assert
      expectToPass(validationResult);
    });

  });

  describe('Password must contain at least one digit', () => {

    test('"maxwellTheBe" returns a false-y response because it lacks a digit', () => {
      // arrange
      const password = 'maxwellTheBe';
  
      // act
      const validationResult = PasswordValidator.Validate(password);
  
      // assert
      expect(validationResult.result).toBe(false);
      expect(validationResult.errors).toHaveLength(1);
      expect(validationResult.errors[0].type).toBe('NoDigitError');
      expect(validationResult.errors[0].message).toBe('Password must contain at least one digit.');
    });
  
    test('"password1" returns a truthy response because it contains a digit', () => {
      // arrange
      const password = 'Password1';
  
      // act
      const validationResult = PasswordValidator.Validate(password);
  
      // assert
      expectToPass(validationResult);
    });

  });

  describe('Password must contain at least one uppercase letter', () => {

    test('"maxwell1_c" returns a false-y response because it lacks an uppercase letter', () => {
      // arrange
      const password = 'maxwell1_c';
  
      // act
      const validationResult = PasswordValidator.Validate(password);
  
      // assert
      expect(validationResult.result).toBe(false);
      expect(validationResult.errors).toHaveLength(1);
      expect(validationResult.errors[0].type).toBe('NoUpperCaseCharacterError');
      expect(validationResult.errors[0].message).toBe('Password must contain at least one upper case letter.');
    });
    
    test('"Password1" returns a truthy response because it contains an uppercase letter', () => {
      // arrange
      const password = 'Password1';
  
      // act
      const validationResult = PasswordValidator.Validate(password);
  
      // assert
      expectToPass(validationResult);
    });
  
  });
});
