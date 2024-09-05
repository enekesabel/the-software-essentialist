import { Operator } from "./Operator";
import { Value } from "./Value";

export class Expression {

    readonly list: (Value | Operator | Expression)[] = [];

    constructor(boolString: string) {
        const words = boolString.split(' ');
        let tempExpression: (Value | Operator)[] = [];

        words.forEach(word => {
            switch (word) {
                case 'TRUE': 
                    tempExpression.push(Value.TRUE);
                    break;
                case 'FALSE': 
                    tempExpression.push(Value.FALSE);
                    break;
                case 'NOT': 
                    tempExpression.push(Operator.NOT);
                    break;
                case 'AND': 
                    tempExpression.push(Operator.AND);
                    break;
                case 'OR': 
                    tempExpression.push(Operator.OR);
                    break;
            }

            // When we reach the end of a sub-expression (based on operators), we can form a sub-expression
            if (words.length > 3 && tempExpression.length === 3) {
                this.list.push(new Expression(tempExpression.map(item => item.toString()).join(' ')));
                tempExpression = [];
            }
        });

        // If there's still a remaining operator/value left that doesn't complete a sub-expression, add it to the list
        this.list.push(...tempExpression);
    }
}
