import { Evaluateable } from "./Evaluateable";
import { And, Not, Operator, Or, UnaryOperator } from "./Operator";
import { splitByParentheses } from "./splitByParentheses";
import { FALSE, TRUE } from "./Value";

const validWords = ['TRUE', 'FALSE', 'NOT', 'AND', 'OR'];

export type PartiallyParsedExpression = (string | Evaluateable)[];

export class ExpressionParser {
    static Parse(booleanString: string): Evaluateable {
        const sections = splitByParentheses(booleanString).map((section) => {
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

    private static ParseWithoutParenthesis(expression: PartiallyParsedExpression): Evaluateable {
        let temp: PartiallyParsedExpression = expression.map(word=>{
            return word === 'TRUE' ? TRUE : word === 'FALSE' ? FALSE : word
        });

        temp = Operator.Parse(temp, Not);
        temp = Operator.Parse(temp, And);
        temp = Operator.Parse(temp, Or);

        if(temp.length !== 1 || !(temp[0] instanceof Evaluateable)) {
            throw new Error('Invalid boolean string');
        }    
        return temp[0];
    }
}
