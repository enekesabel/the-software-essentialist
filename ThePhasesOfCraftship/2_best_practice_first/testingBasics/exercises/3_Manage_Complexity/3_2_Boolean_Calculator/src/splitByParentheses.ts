export const splitByParentheses = (str: string): string[] =>{
    if(!str.includes('(')) {
        return [str];
    }
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

    return sections.map(r=>r.trim());
}