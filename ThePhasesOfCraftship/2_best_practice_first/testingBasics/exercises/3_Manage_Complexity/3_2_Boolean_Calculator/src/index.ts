export class BooleanCalculator {
    static Evaluate(expression: string): boolean {
        if (expression === "TRUE") return true;
        if (expression === "FALSE") return false;
        return true;  // Keeping this as a fallback, for now.
    }
}
