describe('splitByParentheses', () => {

    const splitByParentheses = (str: string): string[] =>{
        return str.split(')')
        .map(s=>s.trim()
        .replace('(', ''))
        .filter(Boolean);
    }

    const testCases = [
        { str: "(TRUE OR FALSE) AND TRUE", expectedResult: [
            'TRUE OR FALSE',
            'AND TRUE'
        ]},
        { str: "(TRUE OR FALSE)", expectedResult: ['TRUE OR FALSE']},
    ];

    it.each(testCases)('should split by parentheses $str', ({ str, expectedResult }) => {
        // act
        const result = splitByParentheses(str);

        // assert
        expect(result).toEqual(expectedResult);
    });

})