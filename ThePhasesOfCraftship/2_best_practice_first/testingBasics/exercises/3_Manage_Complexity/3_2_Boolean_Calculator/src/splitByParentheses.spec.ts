describe('splitByParentheses', () => {

    const splitByParentheses = (str: string): string[] =>{
        return str.split(')')
        .map(s=>s.trim().replace('(', ''));
    }

    it('should split by parentheses', () => {
        // arrange
        const str = "(TRUE OR FALSE) AND TRUE";

        // act
        const result = splitByParentheses(str);

        // assert
        expect(result).toEqual([
            'TRUE OR FALSE',
            'AND TRUE'
        ]);
    })

})