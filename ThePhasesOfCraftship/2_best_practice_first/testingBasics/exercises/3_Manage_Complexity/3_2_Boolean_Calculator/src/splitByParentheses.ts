const throwInvalidParenthesesSyntaxError = () => {
    throw new Error('Invalid parentheses syntax.');
}

export const splitByParentheses = (str: string): string[] =>{
    const sections: string[] = [];
    let openCount = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const appendToLastSection = () => sections[sections.length - 1] += char;
        const startNewSection = () => sections.push('');

        if(char === '(') {
            openCount === 0 ? startNewSection() : null;
            openCount++;
            appendToLastSection();
        } else if (char === ')') {
            if(openCount === 0) {
                throwInvalidParenthesesSyntaxError();
            }
            appendToLastSection();
            openCount--;
            if(openCount === 0 && i !== str.length - 1) {
                startNewSection();
            } 
        } else {
            if(sections.length === 0) {
                startNewSection();
            }
            appendToLastSection();
        }
    }

    if(openCount !== 0) {
        throwInvalidParenthesesSyntaxError();
    }

    return sections.map(r=>r.trim());
}