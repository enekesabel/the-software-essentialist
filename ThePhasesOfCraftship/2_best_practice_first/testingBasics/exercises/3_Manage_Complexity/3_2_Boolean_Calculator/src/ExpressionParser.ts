type Operator = 'NOT' | 'AND' | 'OR';

type Value = true | false;

type Expression = (Value|Operator|Expression)[];

export class ExpressionParser {
    static Parse(booleanString: string): Expression {
        if (booleanString === 'TRUE') {
            return [true];
        }
        if (booleanString === 'FALSE') {
            return [false];
        }
        throw new Error('Invalid boolean string');
    }
}
