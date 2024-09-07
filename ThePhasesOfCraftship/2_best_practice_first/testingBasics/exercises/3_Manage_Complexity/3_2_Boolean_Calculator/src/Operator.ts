import { Evaluateable } from "./Evaluateable";

export abstract class Operator extends Evaluateable {
    abstract evaluate(): boolean;
}

export abstract class UnaryOperator extends Operator {
    readonly value: Evaluateable;
    constructor(value: Evaluateable) {
        super();
        this.value = value;
    }

    toString(): string {
        return `${this.constructor.name} ${this.value.toString()}`;
    }
}

export abstract class BinaryOperator extends Operator {
    readonly left: Evaluateable;
    readonly right: Evaluateable;
    constructor(left: Evaluateable, right: Evaluateable) {
        super();
        this.left = left;
        this.right = right;
    }


    toString(): string {
        return `${this.left.toString()} ${this.constructor.name} ${this.right.toString()}`;
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