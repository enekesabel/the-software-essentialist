import { BooleanCalculator } from ".";

describe('boolean calculator', () => {

    it.each([
        { expression: 'TRUE', expected: true },
        { expression: 'FALSE', expected: false },
        { expression: 'NOT TRUE', expected: false },
        { expression: 'NOT FALSE', expected: true },
        { expression: 'TRUE AND TRUE', expected: true },
        { expression: 'TRUE AND FALSE', expected: false },
        { expression: 'FALSE AND FALSE', expected: false },
        { expression: 'TRUE OR TRUE', expected: true },
        { expression: 'TRUE OR FALSE', expected: true },
        { expression: 'FALSE OR TRUE', expected: true },
        { expression: 'FALSE OR FALSE', expected: false },
        { expression: 'TRUE AND FALSE OR TRUE', expected: true }
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
