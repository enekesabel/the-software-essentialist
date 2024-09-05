type Operator = 'NOT' | 'AND' | 'OR';

type Value = true | false;

type Expression = (Value|Operator|Expression)[];

export class ExpressionParser {
    static Parse(booleanString: string): Expression {
        return [true];
    }
}