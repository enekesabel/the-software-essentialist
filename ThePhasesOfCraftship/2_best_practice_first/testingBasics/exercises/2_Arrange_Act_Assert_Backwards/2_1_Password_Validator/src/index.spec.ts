/*

COLLABORATORS

- PasswordValidator
- ValidationResponse

RESPONSIBILITIES

PasswordValidator:

- validates password.
  - Between 5 and 15 characters long. 
      Ex.: "thePhysical1234567" returns a false-y response because of exceeding the 15 character length
  - Contains at least one digit.
      Ex.: "maxwellTheBe" returns a false-y response because of a lack of digits
  - Contains at least one upper case letter.
      Ex.: "maxwell1_c" returns a false-y response because of a lack of uppercase characters
- constructs ValidationResponse.
Ex.: "thePhysical1" returns a true response because the password matches all criteria

ValidationResponse:

- holds boolean result of the validation.
- holds the list of errors.
*/

import { PasswordValidator } from ".";


describe('password validator', () => {

  test.skip('hello', () => {
    // arrange

    // act

    const validationResult = {
      result: false,
      errors: [
        {
          type: 'InvalidLengthError',
          message: 'Password must be between 5 and 15 characters long.'
        },
        {
          type: 'NoDigitError',
          message: 'Password must contain at least one digit.'
        },
        {
          type: 'NoUpperCaseCharacterError',
          message: 'Password must contain at least one upper case letter.'
        }
      ]
    };

    // assert
    expect(validationResult.result).toBe(false);
    expect(validationResult.errors).toHaveLength(3);
    expect(validationResult.errors[0].type).toBe('InvalidLengthError');
    expect(validationResult.errors[0].message).toBe('Password must be between 5 and 15 characters long.');
    expect(validationResult.errors[1].type).toBe('NoDigitError');
    expect(validationResult.errors[1].message).toBe('Password must contain at least one digit.');
    expect(validationResult.errors[2].type).toBe('NoUpperCaseCharacterError');
    expect(validationResult.errors[2].message).toBe('Password must contain at least one upper case letter.');
  })

  describe('The password must be between 5 and 15 characters long', ()=>{

    // Parameterized tests for invalid length cases
    test.each([
      'thePhysical1234567',  // exceeds 15 characters
      'abcd',                 // exactly 4 characters (pne below the limit)
      'abcdefghijklmnop'     // exactly 16 characters (one over the limit)
    ])('"%s" returns a false-y response due to invalid length', (password) => {

      // act
      const validationResult = PasswordValidator.Validate(password);

      // assert
      expect(validationResult.result).toBe(false);
      expect(validationResult.errors).toHaveLength(1);
      expect(validationResult.errors[0].type).toBe('InvalidLengthError');
      expect(validationResult.errors[0].message).toBe('Password must be between 5 and 15 characters long.');
    });

    // Parameterized test for valid length case
    test.each([
      'abcde',               // exactly 5 characters (valid edge case)
      'abcdefghij12345',     // exactly 15 characters (valid edge case)
      'theValid1',  // within the valid length range
    ])('"%s" returns a truthy response because it is within the valid length range', (password) => {

      // act
      const validationResult = PasswordValidator.Validate(password);

      // assert
      expect(validationResult.result).toBe(true);
      expect(validationResult.errors).toHaveLength(0);
    });

  });
})


