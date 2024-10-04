import { Not, And, Or, Operator } from "./Operator";
import { TRUE, FALSE } from "./Value";


describe('Operator.Parse', () => {
  it.each([
    { expression: ['NOT', TRUE], operatorClass: Not, expected: [new Not(TRUE)] },
    { expression: [TRUE, 'AND', FALSE], operatorClass: And, expected: [new And(TRUE, FALSE)] },
    { expression: [TRUE, 'OR', FALSE], operatorClass: Or, expected: [new Or(TRUE, FALSE)] },
  ])('should parse $expression to $expected', ({ expression, operatorClass, expected }) => {
    expect(Operator.Parse(expression, operatorClass)).toEqual(expected);
  });
});

describe('Not', () => {
  it.each([
    { value: TRUE, expected: false },
    { value: FALSE, expected: true },
  ])('should evaluate to $expected when value is $value', ({ value, expected }) => {
    expect(new Not(value).evaluate()).toBe(expected);
  });

  it.each([
    { value: TRUE, expected: 'NOT TRUE' },
    { value: FALSE, expected: 'NOT FALSE' },
    { value: new And(TRUE, FALSE), expected: 'NOT (TRUE AND FALSE)' },
  ])('should stringify to $expected when value is $value', ({ value, expected }) => {
    expect(new Not(value).toString()).toBe(expected);
  });
});

describe('And', () => {
  it.each([
    { left: TRUE, right: TRUE, expected: true },
    { left: TRUE, right: FALSE, expected: false },
    { left: FALSE, right: TRUE, expected: false },
    { left: FALSE, right: FALSE, expected: false },
  ])('should evaluate to $expected when left is $left and right is $right', ({ left, right, expected }) => {
    expect(new And(left, right).evaluate()).toBe(expected);
  });

  it.each([
    { left: TRUE, right: TRUE, expected: 'TRUE AND TRUE' },
    { left: TRUE, right: FALSE, expected: 'TRUE AND FALSE' },
    { left: FALSE, right: TRUE, expected: 'FALSE AND TRUE' },
    { left: FALSE, right: FALSE, expected: 'FALSE AND FALSE' },
    { left: new Or(TRUE, FALSE), right: TRUE, expected: '(TRUE OR FALSE) AND TRUE' },
  ])('should stringify to $expected when left is $left and right is $right', ({ left, right, expected }) => {
    expect(new And(left, right).toString()).toBe(expected);
  });
});

describe('Or', () => {
  it.each([
    { left: TRUE, right: TRUE, expected: true },
    { left: TRUE, right: FALSE, expected: true },
    { left: FALSE, right: TRUE, expected: true },
    { left: FALSE, right: FALSE, expected: false },
  ])('should evaluate to $expected when left is $left and right is $right', ({ left, right, expected }) => {
    expect(new Or(left, right).evaluate()).toBe(expected);
  });

  it.each([
    { left: TRUE, right: TRUE, expected: 'TRUE OR TRUE' },
    { left: TRUE, right: FALSE, expected: 'TRUE OR FALSE' },
    { left: FALSE, right: TRUE, expected: 'FALSE OR TRUE' },
    { left: FALSE, right: FALSE, expected: 'FALSE OR FALSE' },
    { left: new And(TRUE, FALSE), right: TRUE, expected: '(TRUE AND FALSE) OR TRUE' },
  ])('should stringify to $expected when left is $left and right is $right', ({ left, right, expected }) => {
    expect(new Or(left, right).toString()).toBe(expected);
  });
});
