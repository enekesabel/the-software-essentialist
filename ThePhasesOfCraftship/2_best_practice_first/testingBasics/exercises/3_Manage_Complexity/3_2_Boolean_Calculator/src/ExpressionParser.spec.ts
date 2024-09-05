import { ExpressionParser } from "./ExpressionParser";

describe('ExpressionParser', () => {

    it.each([
        { booleanStr: 'TRUE', expected: [true] },
        { booleanStr: 'FALSE', expected: [false] },
        { booleanStr: 'NOT TRUE', expected: ['NOT', true] },
        { booleanStr: 'NOT FALSE', expected: ['NOT', false] },
        { booleanStr: 'TRUE AND TRUE', expected: [true, 'AND', true] },
        { booleanStr: 'TRUE AND FALSE', expected: [true, 'AND', false] },
        { booleanStr: 'FALSE AND TRUE', expected: [false, 'AND', true] },
        { booleanStr: 'FALSE AND FALSE', expected: [false, 'AND', false] },
        { booleanStr: 'FALSE AND FALSE AND FALSE AND FALSE', expected: [[[false, 'AND', false], 'AND', false], 'AND', false] },
        { booleanStr: 'TRUE AND NOT FALSE', expected: [true, 'AND', ['NOT', false]] },
        { booleanStr: 'NOT NOT NOT FALSE', expected: ['NOT', ['NOT', ['NOT', false]]] },
        { booleanStr: 'NOT TRUE AND NOT NOT FALSE', expected: [['NOT', true], 'AND', ['NOT', ['NOT', false]]] },
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
