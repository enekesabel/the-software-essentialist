type Operator = 'NOT' | 'AND' | 'OR';

type Value = true | false;

type Expression = (Value|Operator|Expression)[];

export class ExpressionParser {
    static Parse(booleanString: string): Expression {
        const words = booleanString.split(' ');

        if (words[0] === 'NOT') {
            const value = this.Parse(words.slice(1).join(' '));
            return ['NOT', ...value];
        }

        if (booleanString === 'TRUE') {
            return [true];
        }

        if (booleanString === 'FALSE') {
            return [false];
        }

        throw new Error('Invalid boolean string');
    }
}
