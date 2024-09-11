const ResolutionTable = {
    NOT: {
        'NOT TRUE': 'FALSE',
        'NOT FALSE': 'TRUE',
    },
    AND: {
        'TRUE AND TRUE': 'TRUE',
        'TRUE AND FALSE': 'FALSE',
        'FALSE AND TRUE': 'FALSE',
        'FALSE AND FALSE': 'FALSE',
    },
    OR: {
        'TRUE OR TRUE': 'TRUE',
        'TRUE OR FALSE': 'TRUE',
        'FALSE OR TRUE': 'TRUE',
        'FALSE OR FALSE': 'FALSE',
    }
} as const;

export class BooleanCalculator {

    private static ResolveExpressions(booleanStr: string): string {
        
        // matches all groups of parentheses that doesn't have nested parentheses
        // ex. from ((TRUE) OR (TRUE OR (TRUE OR TRUE))) would match: ['(TRUE)', '(TRUE OR TRUE)']
        const regExp = /\([^()]*\)/g;
        let matches = booleanStr.match(regExp);
        while(matches) {
           matches.forEach(match => {
               const matchWithoutParentheses = match.slice(1, -1);
               booleanStr = booleanStr.replace(match, this.ResolveExpressions(matchWithoutParentheses));
           })
           matches = booleanStr.match(regExp);
        }
        
        Object.entries(ResolutionTable).forEach(([operator, resolutions]) => {
            let prevLength = 0;
            while (booleanStr.includes(operator) && prevLength !== booleanStr.length) {
                prevLength = booleanStr.length;
                Object.entries(resolutions).forEach(([expression, value]) => {
                    while(booleanStr.includes(expression)) {
                        booleanStr = booleanStr.replace(expression, value);
                    }
                });
            }
        });
        return booleanStr;
    }

    public static Evaluate(booleanStr: string): boolean {

        const resolvedExpression = this.ResolveExpressions(booleanStr);

        if(resolvedExpression === 'TRUE') {
            return true;
        } 
        if(resolvedExpression === 'FALSE') {
            return false;
        }
    
        throw new Error('Invalid boolean expression.');
    }

}