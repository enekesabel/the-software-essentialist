import { Expression } from "./Expression"
import { Operator } from "./Operator";
import { Value } from "./Value";

describe('Expression', () => {

    describe('It should be able to parse a valid boolean string into a list of Values, Operators and Expressions', () => {

        it.each([
            { boolString: 'TRUE', expected: [Value.TRUE] },
            { boolString: 'FALSE', expected: [Value.FALSE] },
            { boolString: 'NOT FALSE', expected: [Operator.NOT, Value.FALSE] }
        ])('Should parse "$boolString" correctly', ({ boolString, expected }) => {
            // act
            const expression = new Expression(boolString);

            // assert
            expect(expression.list).toMatchObject(expected);
        });

    });

});
