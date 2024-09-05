type Operator = 'NOT' | 'AND' | 'OR';
type Value = true | false;
type Expression = (Value | Operator | Expression)[];

export class ExpressionParser {
    static Parse(booleanString: string): Expression {
        const words = booleanString.split(' ');
        const expression: Expression = [];

        for (let i = 0; i < words.length; i++) {
            const word = words[i];

            switch (word) {
                case 'TRUE':
                    expression.push(true);
                    break;
                case 'FALSE':
                    expression.push(false);
                    break;
                case 'NOT':
                    expression.push('NOT');
                    break;
                case 'AND':
                    expression.push('AND');
                    break;
                case 'OR':
                    expression.push('OR');
                    break;
                default:
                    throw new Error('Invalid boolean string');
            }
        }

        const notCount = words.filter(word => word === 'NOT').length;
        for (let i = 0; i < notCount; i++) {
            const index = expression.lastIndexOf('NOT');
            expression.splice(index, 2, ['NOT', expression[index + 1]]);
        }

        const andCount = words.filter(word => word === 'AND').length;
        for(let i = 0; i < andCount; i++) {
            const index = expression.indexOf('AND');

            expression.splice(index - 1, 3, [expression[index - 1], 'AND', expression[index + 1]]);
        }

        const orCount = words.filter(word => word === 'OR').length;
        for (let i = 0; i < orCount; i++) {
            const index = expression.indexOf('OR');
            expression.splice(index - 1, 3, [expression[index - 1], 'OR', expression[index + 1]]);
        }

        // if there is only 1 item in the expression, wich is an Expression itself, return that Expression
        return expression.length === 1 && Array.isArray(expression[0]) ? expression[0] : expression;
    }
}
