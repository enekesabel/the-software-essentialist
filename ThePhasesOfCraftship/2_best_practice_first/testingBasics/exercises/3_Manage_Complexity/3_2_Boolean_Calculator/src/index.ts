const parseValue = (value:string) => {
    if(value === 'TRUE'){
        return true;
    }
    if(value === 'FALSE'){
        return false;
    }
}

export class BooleanCalculator {
    static Evaluate(expression: string): boolean {

        const words = expression.split(' ');

        let result: boolean | undefined;
        words.forEach((word, index)=>{

            const previousWord = words[index - 1];

            switch (previousWord) {
                case undefined:
                    result = parseValue(word);
                    break;
                case 'NOT':
                    result = !parseValue(word);
                    break;
                case 'AND':
                    result = result && parseValue(word)
                    break;
                case 'OR':
                    result = result || parseValue(word)
                    break;
            }
        })

        if(result === undefined){
            throw new Error("Invalid boolean expression")
        }
        return result;
    }
}