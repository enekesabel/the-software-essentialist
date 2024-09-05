export class BooleanCalculator {
    static Evaluate(expression: string): boolean {
        if (expression === "TRUE") return true;
        if (expression === "FALSE") return false;
        throw new Error("Invalid boolean expression");
    }
}
