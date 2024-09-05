import { BooleanCalculator } from ".";

describe('boolean calculator', () => {

    it('Should evaluate "TRUE" to true', () => {
        // arrange
        const expression = 'TRUE';

        // act
        const result = BooleanCalculator.Evaluate(expression);

        // assert
        expect(result).toBe(true);
    });

    it('Should evaluate "FALSE" to false', () => {
        // arrange
        const expression = 'FALSE';

        // act
        const result = BooleanCalculator.Evaluate(expression);

        // assert
        expect(result).toBe(false);
    });

});
