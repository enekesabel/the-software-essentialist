describe('splitByParentheses', () => {

    const splitByParentheses = (str: string): string[] =>{

        const result: string[] = [];
        let openCount = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if(char === '(') {
                if(openCount === 0) {
                    result.push('');
                }
                openCount++;
                continue;
            } 
            if (char === ')') {
                openCount--;
                if(openCount === 0 && i !== str.length - 1) {
                    result.push('');
                }
                continue;
            }
            result[result.length - 1] += char;
        }

        return result.map(r=>r.trim());
    }

    it.each([
        { str: "(TRUE OR FALSE) AND TRUE", expectedResult: [
            'TRUE OR FALSE',
            'AND TRUE'
        ]},
        { str: "(TRUE OR FALSE)", expectedResult: ['TRUE OR FALSE']},
        { str: "(TRUE) OR (FALSE)", expectedResult: ['TRUE', 'OR', 'FALSE']},
    ])('should split by parentheses $str', ({ str, expectedResult }) => {
        // act
        const result = splitByParentheses(str);

        // assert
        expect(result).toEqual(expectedResult);
    });

})