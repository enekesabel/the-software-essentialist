import { BooleanCalculator } from ".";

describe('boolean calculator', () => {

    it('Should evaluate "TRUE" to true', () => {
        const expression = 'TRUE';
        const result = BooleanCalculator.Evaluate(expression);
        expect(result).toBe(true);
    });

    it('Should evaluate "FALSE" to false', () => {
        const expression = 'FALSE';
        const result = BooleanCalculator.Evaluate(expression);
        expect(result).toBe(false);
    });

    it('Should throw an error for an invalid expression', () => {
        const expression = 'INVALID';

        expect(() => {
            BooleanCalculator.Evaluate(expression);
        }).toThrowError("Invalid boolean expression");
    });

    it('Should evaluate "NOT TRUE" to false', () => {
        const expression = 'NOT TRUE';
        const result = BooleanCalculator.Evaluate(expression);
        expect(result).toBe(false);
    });

});
