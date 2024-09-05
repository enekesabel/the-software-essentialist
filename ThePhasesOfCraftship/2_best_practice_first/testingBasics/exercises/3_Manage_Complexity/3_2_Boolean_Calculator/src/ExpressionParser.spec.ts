import { ExpressionParser } from "./ExpressionParser";

describe('ExpressionParser', () => {

    it.each([
        { booleanStr: 'TRUE', expected: [true] },
        { booleanStr: 'FALSE', expected: [false] },
        { booleanStr: 'NOT TRUE', expected: ['NOT', true] },
        { booleanStr: 'NOT FALSE', expected: ['NOT', false] }
    ])('Should correctly parse "$booleanStr"', ({ booleanStr, expected }) => {
        // act
        const expression = ExpressionParser.Parse(booleanStr);

        // assert
        expect(expression).toEqual(expected);
    });

    it('Should throw an error for an invalid boolean string', () => {
        // arrange
        const invalidStr = 'INVALID';

        // act & assert
        expect(() => ExpressionParser.Parse(invalidStr)).toThrowError('Invalid boolean string');
    });

});
