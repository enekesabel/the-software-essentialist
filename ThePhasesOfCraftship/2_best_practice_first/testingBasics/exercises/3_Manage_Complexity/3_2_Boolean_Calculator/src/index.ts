import { ExpressionParser } from "./ExpressionParser";

export class BooleanCalculator {
    static Evaluate(expression: string): boolean {
        return ExpressionParser.Parse(expression).evaluate();
    }
}