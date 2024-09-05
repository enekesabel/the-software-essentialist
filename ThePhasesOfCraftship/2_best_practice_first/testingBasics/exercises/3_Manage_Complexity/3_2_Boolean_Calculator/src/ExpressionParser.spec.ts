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

    it('Should be able to parse "NOT TRUE" as ["NOT", true]', () => {
        // arrange
        const booleanStr = 'NOT TRUE';

        // act
        const expression = ExpressionParser.Parse(booleanStr);

        // assert
        expect(expression).toEqual(['NOT', true]);
    });

    it('Should be able to parse "NOT FALSE" as ["NOT", false]', () => {
        // arrange
        const booleanStr = 'NOT FALSE';

        // act
        const expression = ExpressionParser.Parse(booleanStr);

        // assert
        expect(expression).toEqual(['NOT', false]);
    });

});
