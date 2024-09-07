import { Evaluateable } from "./Evaluateable";
import { And, BinaryOperator, Not, Operator, Or, UnaryOperator } from "./Operator";
import { splitByParentheses } from "./splitByParentheses";
import { FALSE, TRUE, Value } from "./Value";

const validWords = ['TRUE', 'FALSE', 'NOT', 'AND', 'OR'];

export class ExpressionParser {
    static Parse(booleanString: string): Evaluateable {
        const sections = splitByParentheses(booleanString).map((section, _, array) => {
            if(section[0] === '(') {
                return this.Parse(section.substring(1, section.length - 1));
            }
            
            const words = section.split(' ')
            if(words.some(word => !validWords.includes(word))) {
                throw new Error('Invalid boolean string');
            }
            return words;
        }).flat();
        
        return this.ParseWithoutParenthesis(sections);
    }

    private static ParseOperator(expression: (string | Evaluateable)[], OperatorClass: new (...params:any) => Operator): (string | Evaluateable)[] {
        const temp = [...expression];
        const name = OperatorClass.name.toUpperCase();
        const count = temp.filter(word => word === name).length;
        const isUnary = OperatorClass.prototype instanceof UnaryOperator;
        for (let i = 0; i < count; i++) {
            const index = isUnary ? temp.lastIndexOf(name) : temp.indexOf(name);
            if(isUnary) {
                const value = temp[index + 1];
                if(!(value instanceof Evaluateable)) {
                    throw new Error('Invalid boolean string');
                }
                temp.splice(index, 2, new OperatorClass(value));
            } else {
                const left = temp[index - 1];
                const right = temp[index + 1];
                if(!(left instanceof Evaluateable && right instanceof Evaluateable)) {
                    throw new Error('Invalid boolean string');
                }

                temp.splice(index - 1, 3, new OperatorClass(left, right));
            }
        }
        
        return temp;
    }

    private static ParseWithoutParenthesis(expression: (string | Evaluateable)[]): Evaluateable {
        let temp: (string | Evaluateable)[] = expression.map(word=>{
            return word === 'TRUE' ? TRUE : word === 'FALSE' ? FALSE : word
        });

        temp = this.ParseOperator(temp, Not);
        temp = this.ParseOperator(temp, And);
        temp = this.ParseOperator(temp, Or);

        if(temp.length !== 1 || !(temp[0] instanceof Evaluateable)) {
            throw new Error('Invalid boolean string');
        }    
        return temp[0];
    }
}
