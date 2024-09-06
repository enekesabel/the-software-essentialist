describe('splitByParentheses', () => {

    const splitByParentheses = (str: string): string[] =>{

        const sections: string[] = [];
        let openCount = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const appendToLastSection = () => sections[sections.length - 1] += char;
            const startNewSection = () => sections.push('');

            if(char === '(') {
                openCount === 0 ? startNewSection() : appendToLastSection();
                openCount++;
            } else if (char === ')') {
                openCount--;
                if(openCount === 0 && i !== str.length - 1) {
                    startNewSection();
                } 
                if(openCount !== 0) {
                    appendToLastSection();
                }
            } else {
                appendToLastSection();
            }
        }

        return sections.map(r=>r.trim());
    }

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