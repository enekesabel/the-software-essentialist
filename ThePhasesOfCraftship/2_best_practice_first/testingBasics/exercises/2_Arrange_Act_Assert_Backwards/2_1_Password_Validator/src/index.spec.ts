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


describe('password validator', () => {

  test('hello', () => {
    expect("between 5 and 15").toContain('5 and 15')
  })
})


