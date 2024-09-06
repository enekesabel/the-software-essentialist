export const splitByParentheses = (str: string): string[] =>{
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