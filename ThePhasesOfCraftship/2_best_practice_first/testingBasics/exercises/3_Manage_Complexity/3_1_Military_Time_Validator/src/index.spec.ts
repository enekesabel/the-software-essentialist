/*

RESPONSIBILITIES
- validate time string
  - must match the `HH:MM - HH:MM` template
        "00:00 - 00:00" (yes)
        "0:00 - 00:00" (no)
        "00:0 - 00:00" (no)
        "00:00 - 0:00" (no)
        "00:00 - 00:0" (no)
  - validate on start and end time:
    - hours range: 0-23
            "25:00 - 00:00" (no)
            "00:00 - 25:00" (no)
    - minutes range: 0-59
            "00:60 - 00:00" (no)
            "00:00 - 00:60" (no)
- return `true` or `false` based on the validation outcome

Assignment examples:
"01:12 - 14:32" (yes)
"25:00 - 12:23" (no)
"22:00 - 23:12" (yes)

*/

import { militaryTimeValidator } from "."

describe('military time validator', () => {

    it.each([
        ["00:00 - 00:00", true],
        ["0:00 - 00:00", false],
        ["00:00 : 00:00", false],
        ["00-00 - 00:00", false],
        ["00:00 - 00-00", false],
        ["00:00-00:00", false]
    ])('Correctly identifies "%s" as a %s military time string.', (time: string, expected: boolean) => {
        const result = militaryTimeValidator(time);
        expect(result).toBe(expected);
    });

    it('Correctly identifies "24:00 - 00:00" as an invalid military time string, since the start hours are over 23', () => {
        // arrange
        const time = "24:00 - 00:00";
    
        // act
        const result = militaryTimeValidator(time);
    
        // assert
        expect(result).toBe(false);
    });

    it('Correctly identifies "00:00 - 24:00" as an invalid military time string, since the end hours are over 23', () => {
        // arrange
        const time = "00:00 - 24:00";
    
        // act
        const result = militaryTimeValidator(time);
    
        // assert
        expect(result).toBe(false);
    });

    it('Correctly identifies "00:60 - 00:00" as an invalid military time string, since the start minutes are over 59', () => {
        // arrange
        const time = "00:60 - 00:00";
    
        // act
        const result = militaryTimeValidator(time);
    
        // assert
        expect(result).toBe(false);
    });
})
