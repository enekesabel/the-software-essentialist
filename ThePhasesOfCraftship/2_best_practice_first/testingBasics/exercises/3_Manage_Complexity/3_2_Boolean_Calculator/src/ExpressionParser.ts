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
                default:
                    throw new Error('Invalid boolean string');
            }
        }

        return expression;
    }
}
