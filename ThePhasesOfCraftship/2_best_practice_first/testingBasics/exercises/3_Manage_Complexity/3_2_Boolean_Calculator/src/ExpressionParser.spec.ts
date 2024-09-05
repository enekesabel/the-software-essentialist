import { ExpressionParser } from "./ExpressionParser";

describe('ExpressionParser', () => {

    it('Should be able to parse "TRUE" as true', () => {
        // arrange
        const booleanStr = 'TRUE';

        // act
        const expression = ExpressionParser.Parse(booleanStr);

        // assert
        expect(expression).toEqual([true]);
    });

    it('Should be able to parse "FALSE" as false', () => {
        // arrange
        const booleanStr = 'FALSE';

        // act
        const expression = ExpressionParser.Parse(booleanStr);

        // assert
        expect(expression).toEqual([false]);
    });

    it('Should throw an error for an invalid boolean string', () => {
        // arrange
        const invalidStr = 'INVALID';

        // act & assert
        expect(() => ExpressionParser.Parse(invalidStr)).toThrowError('Invalid boolean string');
    });

});
