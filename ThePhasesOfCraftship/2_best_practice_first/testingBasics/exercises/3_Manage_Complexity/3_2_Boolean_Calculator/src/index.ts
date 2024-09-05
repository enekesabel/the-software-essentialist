export class BooleanCalculator {
    static Evaluate(expression: string): boolean {

        const words = expression.split(' ');

        let result;
        let negate = false;
        words.forEach(word=>{
            if(word === 'TRUE'){
                result = negate? false : true;
            }
            if(word === 'FALSE'){
                result = negate? true : false;
            }
            if(word === 'NOT'){
                negate = true;
            }
        })

        if(result === undefined){
            throw new Error("Invalid boolean expression")
        }
        return result;
    }
}
