import { militaryTimeValidator } from "."

describe('military time validator', () => {

    describe('It should enforce the "HH:MM - HH:MM" format', ()=>{
        it.each([
            ["00:00 - 00:00", true],
            ["0:00 - 00:00", false],
            ["00:00 : 00:00", false],
            ["00-00 - 00:00", false],
            ["00:00 - 00-00", false],
            ["00:00-00:00", false],
            ["a0:00 - 00:00", false],
            ["00:00 - 0a:00", false],
            ["00:a0 - 00:00", false],
            ["00:00 - 00:0a", false],
        ])('Correctly identifies "%s" as a %s military time string.', (time: string, expected: boolean) => {
            const result = militaryTimeValidator(time);
            expect(result).toBe(expected);
        });
    })
    
    describe('It should make sure that the hours are in the 0-23 range.', () => {
        test.each([
            ["24:00 - 00:00", false],
            ["00:00 - 24:00", false],
            ["23:00 - 00:00", true],
            ["00:00 - 23:00", true],

            // tests from the assignment
            ["22:00 - 23:12", true],
            ["25:00 - 12:23", false],
            ["01:12 - 14:32", true],
        ])('Correctly identifies "%s" as a %s military time string.', (time: string, expected: boolean) => {
            const result = militaryTimeValidator(time);
            expect(result).toBe(expected);
        });
    });

    describe('It should make sure that the minutes are in the 0-59 range.', () => {
        test.each([
            ["00:60 - 00:00", false],
            ["00:00 - 00:60", false],
            ["00:59 - 00:00", true],
            ["00:00 - 00:59", true]
        ])('Correctly identifies "%s" as a %s military time string.', (time: string, expected: boolean) => {
            const result = militaryTimeValidator(time);
            expect(result).toBe(expected);
        });
    });    
    
})
