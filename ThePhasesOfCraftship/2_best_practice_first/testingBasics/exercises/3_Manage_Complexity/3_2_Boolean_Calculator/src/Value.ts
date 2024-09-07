import { Evaluateable } from "./Evaluateable";

class Value extends Evaluateable {
    constructor(private value: boolean) {
        super()
    }

    toString(): string {
        return String(this.value);
    }
    evaluate(): boolean {
        return this.value;
    }
}

export const TRUE = new Value(true);
export const FALSE = new Value(false);