import { splitByParentheses } from "./splitByParentheses";

describe('splitByParentheses', () => {

    it.each([
        { str: "TRUE", expectedResult: ['TRUE']},
        { str: "(TRUE OR FALSE) AND TRUE", expectedResult: [
            '(TRUE OR FALSE)',
            'AND TRUE'
        ]},
        { str: "(TRUE OR FALSE)", expectedResult: ['(TRUE OR FALSE)']},
        { str: "NOT (TRUE)", expectedResult: ['NOT', '(TRUE)']},
        { str: "(TRUE) OR (FALSE)", expectedResult: ['(TRUE)', 'OR', '(FALSE)']},
        { str: "((TRUE OR FALSE) AND TRUE) AND (FALSE OR (TRUE))", expectedResult: ['((TRUE OR FALSE) AND TRUE)', 'AND', '(FALSE OR (TRUE))']},
    ])('should split by parentheses $str', ({ str, expectedResult }) => {
        // act
        const result = splitByParentheses(str);

        // assert
        expect(result).toEqual(expectedResult);
    });

    describe(`It should throw an error if the string contains invalid parentheses syntax.`, ()=>{
        it.each([
            { str: "(TRUE", error: 'Invalid parentheses syntax.' },
            { str: "((TRUE)", error: 'Invalid parentheses syntax.' },
        ])('should throw an error if the string contains unclosed opening brackets: $str', ({ str, error }) => {
            expect(() => splitByParentheses(str)).toThrowError(error);
        });        
    })

    it.each([
        { str: '(TRUE', error: 'Invalid parentheses syntax.' },
        { str: 'TRUE(', error: 'Invalid parentheses syntax.' },
    ])('should throw an error if the string contains parentheses in invalid order: $str', ({ str, error }) => {
        expect(() => splitByParentheses(str)).toThrowError(error);
    });

})
