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

import { militrayTimeValidator } from "."

describe('military time validator', () => {

    it('Should tell that "00:00 - 00:00" is a valid military time string.', ()=>{
        // arrange
        const time = "00:00 - 00:00";

        // act
        const result = militrayTimeValidator(time);

        // assert
        expect(result).toBe(true);
    })

})
