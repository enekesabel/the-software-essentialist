import { BooleanCalculator } from ".";

describe('boolean calculator', () => {

    it.each([
        { expression: 'TRUE', expected: true },
        { expression: 'FALSE', expected: false },
        { expression: 'NOT TRUE', expected: false },
        { expression: 'NOT FALSE', expected: true },
    ])('Should evaluate "$expression" correctly', ({ expression, expected }) => {
        const result = BooleanCalculator.Evaluate(expression);
        expect(result).toBe(expected);
    });

    it('Should throw an error for an invalid expression', () => {
        const expression = 'INVALID';

        expect(() => {
            BooleanCalculator.Evaluate(expression);
        }).toThrowError("Invalid boolean expression");
    });

});
