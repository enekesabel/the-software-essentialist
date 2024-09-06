import { Evaluateable } from "./Evaluateable";
import { And, Not, Or } from "./Operator";
import { FALSE, TRUE, Value } from "./Value";

const validWords = ['TRUE', 'FALSE', 'NOT', 'AND', 'OR'];

export class ExpressionParser {
    static Parse(booleanString: string): Evaluateable {
        const words = booleanString.split(' ')

        if(words.some(word => !validWords.includes(word))) {
            throw new Error('Invalid boolean string');
        }

        const temp: (string | Evaluateable)[] = words.map(word=>{
            return word === 'TRUE' ? TRUE : word === 'FALSE' ? FALSE : word
        });

        const notCount = temp.filter(word => word === 'NOT').length;
        for (let i = 0; i < notCount; i++) {
            const index = temp.lastIndexOf('NOT');
            const value = temp[index + 1];
            if(!(value instanceof Evaluateable)) {
                throw new Error('Invalid boolean string');
            }
            temp.splice(index, 2, new Not(value));
        }

        const andCount = temp.filter(word => word === 'AND').length;
        for(let i = 0; i < andCount; i++) {
            const index = temp.indexOf('AND');
            const left = temp[index - 1];
            const right = temp[index + 1];
            if(!(left instanceof Evaluateable && right instanceof Evaluateable)) {
                throw new Error('Invalid boolean string');
            }
            temp.splice(index - 1, 3, new And(left, right));
        }

        const orCount = temp.filter(word => word === 'OR').length;
        for (let i = 0; i < orCount; i++) {
            const index = temp.indexOf('OR');

            const left = temp[index - 1];
            const right = temp[index + 1];
            if(!(left instanceof Evaluateable && right instanceof Evaluateable)) {
                throw new Error('Invalid boolean string');
            }

            temp.splice(index - 1, 3, new Or(left, right));
        }

        if(temp.length !== 1 || !(temp[0] instanceof Evaluateable)) {
            throw new Error('Invalid boolean string');
        }    
        return temp[0];
    }
}