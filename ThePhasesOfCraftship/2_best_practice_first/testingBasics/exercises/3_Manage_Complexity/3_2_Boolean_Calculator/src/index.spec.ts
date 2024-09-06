import { BooleanCalculator } from ".";

describe('boolean calculator', () => {

    it.each([
        { booleanStr: 'TRUE', expected: true },
        { booleanStr: 'FALSE', expected: false },
        { booleanStr: 'NOT TRUE', expected: false },
        { booleanStr: 'TRUE AND FALSE', expected: false },
        { booleanStr: 'TRUE AND TRUE', expected: true },
        { booleanStr: 'TRUE OR FALSE', expected: true },
        { booleanStr: 'FALSE OR FALSE', expected: false },
        { booleanStr: 'TRUE OR TRUE OR TRUE AND FALSE', expected: true },
        { booleanStr: 'TRUE OR FALSE AND NOT FALSE', expected: true },
    ])('Should correctly parse "$booleanStr"', ({ booleanStr, expected }) => {
        // act
        const result = BooleanCalculator.Evaluate(booleanStr);

        // assert
        expect(result).toBe(expected);
    });

    it('Should throw an error for an invalid boolean string', () => {
        // arrange
        const invalidStr = 'INVALID';

        // act & assert
        expect(() => BooleanCalculator.Evaluate(invalidStr)).toThrowError('Invalid boolean string');
    });

})
