import { ExpressionParser } from "./ExpressionParser";
import { And, Not, Or } from "./Operator";
import { FALSE, TRUE } from "./Value";

describe('ExpressionParser', () => {

    it.each([
        { booleanStr: 'TRUE', expected: TRUE },
        { booleanStr: 'FALSE', expected: FALSE },
        { booleanStr: 'NOT TRUE', expected: new Not(TRUE) },
        { booleanStr: 'NOT FALSE', expected: new Not(FALSE) },
        { booleanStr: 'TRUE AND TRUE', expected: new And(TRUE, TRUE) },
        { booleanStr: 'TRUE AND FALSE', expected: new And(TRUE, FALSE) },
        { booleanStr: 'FALSE AND TRUE', expected: new And(FALSE, TRUE) },
        { booleanStr: 'FALSE AND FALSE', expected: new And(FALSE, FALSE) },
        { booleanStr: 'FALSE AND FALSE AND FALSE AND FALSE', expected: new And(new And(new And(FALSE, FALSE), FALSE), FALSE) },
        { booleanStr: 'TRUE AND NOT FALSE', expected: new And(TRUE, new Not(FALSE)) },
        { booleanStr: 'NOT NOT NOT FALSE', expected: new Not(new Not(new Not(FALSE))) },
        { booleanStr: 'NOT TRUE AND NOT NOT FALSE', expected: new And(new Not(TRUE), new Not(new Not(FALSE))) },
        { booleanStr: 'TRUE OR FALSE', expected: new Or(TRUE, FALSE) },
        { booleanStr: 'TRUE AND TRUE OR FALSE', expected: new Or(new And(TRUE, TRUE), FALSE) },
        { booleanStr: 'TRUE OR TRUE AND FALSE', expected: new Or(TRUE, new And(TRUE, FALSE)) },
        { booleanStr: 'TRUE OR TRUE OR TRUE OR TRUE', expected: new Or(new Or(new Or(TRUE, TRUE), TRUE), TRUE) },
        { booleanStr: 'NOT TRUE OR NOT NOT FALSE', expected: new Or(new Not(TRUE), new Not(new Not(FALSE))) },
        { booleanStr: 'NOT TRUE OR NOT TRUE AND NOT FALSE', expected: new Or(new Not(TRUE), new And(new Not(TRUE), new Not(FALSE))) },
    ])('Should correctly parse "$booleanStr"', ({ booleanStr, expected }) => {
        // act
        const expression = ExpressionParser.Parse(booleanStr);

        // assert
        expect(expression.toString()).toEqual(expected.toString());
        expect(expression).toMatchObject(expected);
    });

    it.each([
        { booleanStr: '(TRUE)', expected: TRUE },
        { booleanStr: '(TRUE OR TRUE OR TRUE) AND FALSE', expected: new And(new Or(new Or(TRUE, TRUE), TRUE), FALSE) },
        { booleanStr: 'NOT (TRUE AND TRUE)', expected: new Not(new And(TRUE, TRUE)) },
    ])('Should correctly parse "$booleanStr"', ({ booleanStr, expected }) => {
        // act
        const expression = ExpressionParser.Parse(booleanStr);

        // assert
        expect(expression.toString()).toEqual(expected.toString());
        expect(expression).toMatchObject(expected);
    });

    it.each([
        { booleanStr: '', expectedError: 'Invalid boolean string' },
        { booleanStr: 'something', expectedError: 'Invalid boolean string' },
        { booleanStr: 'something else', expectedError: 'Invalid boolean string' },
        { booleanStr: 'NOT', expectedError: 'Invalid boolean string' },
        { booleanStr: 'OR', expectedError: 'Invalid boolean string' },
        { booleanStr: 'AND', expectedError: 'Invalid boolean string' },
        { booleanStr: 'OR TRUE', expectedError: 'Invalid boolean string' },
        { booleanStr: 'AND TRUE', expectedError: 'Invalid boolean string' },
        { booleanStr: 'TRUE OR', expectedError: 'Invalid boolean string' },
        { booleanStr: 'TRUE AND', expectedError: 'Invalid boolean string' },
        { booleanStr: 'TRUE OR AND TRUE', expectedError: 'Invalid boolean string' },
        { booleanStr: 'TRUE AND OR TRUE', expectedError: 'Invalid boolean string' },
        { booleanStr: 'NOT AND TRUE', expectedError: 'Invalid boolean string' },
        { booleanStr: 'NOT OR TRUE', expectedError: 'Invalid boolean string' },
    ])('Should throw an error for an invalid boolean string "$booleanStr"', ({ booleanStr, expectedError }) => {
        // act & assert
        expect(() => ExpressionParser.Parse(booleanStr)).toThrowError(expectedError);
    });
});
