import { splitByParentheses } from "./splitByParentheses";

describe('splitByParentheses', () => {

    it.each([
        { str: "(TRUE OR FALSE) AND TRUE", expectedResult: [
            'TRUE OR FALSE',
            'AND TRUE'
        ]},
        { str: "(TRUE OR FALSE)", expectedResult: ['TRUE OR FALSE']},
        { str: "(TRUE) OR (FALSE)", expectedResult: ['TRUE', 'OR', 'FALSE']},
        { str: "((TRUE OR FALSE) AND TRUE) AND (FALSE OR (TRUE))", expectedResult: ['(TRUE OR FALSE) AND TRUE', 'AND', 'FALSE OR (TRUE)']},
    ])('should split by parentheses $str', ({ str, expectedResult }) => {
        // act
        const result = splitByParentheses(str);

        // assert
        expect(result).toEqual(expectedResult);
    });

})