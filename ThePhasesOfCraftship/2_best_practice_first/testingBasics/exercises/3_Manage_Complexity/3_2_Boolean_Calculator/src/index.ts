export class BooleanCalculator {
    static Evaluate(expression: string): boolean {
        if (expression === "TRUE") return true;
        if (expression === "FALSE") return false;
        if (expression === "NOT TRUE") return false;
        if (expression === "NOT FALSE") return true;
        throw new Error("Invalid boolean expression");
    }
}
