import { Evaluateable } from "./Evaluateable";
import { PartiallyParsedExpression } from "./ExpressionParser";

export abstract class Operator extends Evaluateable {
    static Parse(expression: PartiallyParsedExpression, OperatorClass: new (...params:any) => Operator): PartiallyParsedExpression{
        return OperatorClass.prototype.parse(expression);
    }

    protected get name(): string {
        return this.constructor.name.toUpperCase();
    }

    abstract evaluate(): boolean;
    protected abstract parse(expression: PartiallyParsedExpression): PartiallyParsedExpression;
}

export abstract class UnaryOperator extends Operator {
    readonly value: Evaluateable;
    constructor(value: Evaluateable) {
        super();
        this.value = value;
    }

    toString(): string {
        const stringifiedValue = this.value instanceof BinaryOperator? `(${this.value.toString()})` : this.value.toString();
        return `${this.name} ${stringifiedValue}`;
    }
    protected parse(expression: PartiallyParsedExpression): PartiallyParsedExpression {
        const temp = [...expression];
        const count = temp.filter(word => word === this.name).length;
       
        for (let i = 0; i < count; i++) {
            const index = temp.lastIndexOf(this.name);
            const value = temp[index + 1];
            if(!(value instanceof Evaluateable)) {
                throw new Error('Invalid boolean string');
            }
            temp.splice(index, 2, new (this.constructor as any)(value));
        }
        
        return temp;
    }
}

abstract class BinaryOperator extends Operator {
    readonly left: Evaluateable;
    readonly right: Evaluateable;
    constructor(left: Evaluateable, right: Evaluateable) {
        super();
        this.left = left;
        this.right = right;
    }

    toString(): string {

        const stringifiedLeft = this.left instanceof BinaryOperator? `(${this.left.toString()})` : this.left.toString();
        const stringifiedRight = this.right instanceof BinaryOperator? `(${this.right.toString()})` : this.right.toString();

        return `${stringifiedLeft} ${this.name} ${stringifiedRight}`;
    }

    protected parse(expression: PartiallyParsedExpression): PartiallyParsedExpression {
        const temp = [...expression];
        const count = temp.filter(word => word === this.name).length;
       
        for (let i = 0; i < count; i++) {
            const index = temp.indexOf(this.name);
            const left = temp[index - 1];
            const right = temp[index + 1];
            if(!(left instanceof Evaluateable && right instanceof Evaluateable)) {
                throw new Error('Invalid boolean string');
            }
            
            temp.splice(index - 1, 3, new (this.constructor as any)(left, right));
        }
        
        return temp;
    }
}

export class Not extends UnaryOperator {
    evaluate(): boolean {
        return !this.value.evaluate();
    }
}

export class And extends BinaryOperator {
    evaluate(): boolean {
        return this.left.evaluate() && this.right.evaluate();
    }
}

export class Or extends BinaryOperator {
    evaluate(): boolean {
        return this.left.evaluate() || this.right.evaluate();
    }
}