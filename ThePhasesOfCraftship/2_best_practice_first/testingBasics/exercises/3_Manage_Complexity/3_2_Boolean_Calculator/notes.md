**Description**: Create a boolean calculator that takes a boolean expression (as a string) and evaluates it to compute the correct output boolean result

## UPFRONT DESIGN

### FIND

#### Terms

- Value: `TRUE`, `FALSE`
- Operator:
    - Unary: `NOT`
    - Binary: `AND`, `OR`
- Expression: 
    - a valid group of Values, Operators and Expressions
    - can be grouped by parenthesis to express precedence
        - `#Value` -> `(#Value)`
        - `NOT #Value/#Expression` -> `(NOT #Value/#Expression)`
        - `#Value/#Expression #BinaryOperator #Value/#Expression` -> `(#Value/#Expression #BinaryOperator #Value/#Expression)`

#### Responsibilities
- evaluate expressions
    - Single values
        > "TRUE" -> true

        > "FALSE" -> false
    - NOT operator
        > "NOT TRUE" -> false

        > "NOT FALSE" -> TRUE
    - AND operator
        > "TRUE AND FALSE" -> false

        > "TRUE AND TRUE" -> true
    - OR operator
        > "TRUE OR FALSE" -> true

        > "FALSE OR FALSE" -> false
    - Parenthesis
        > "(TRUE OR TRUE OR TRUE) AND FALSE" -> false

        > "NOT (TRUE AND TRUE)" -> false
    - Combination of operators w/ precedence
        > NOT > AND > OR

        > "TRUE OR TRUE OR TRUE AND FALSE" -> true  
        "TRUE OR (TRUE OR (TRUE AND FALSE))" -> true

        > "TRUE OR FALSE AND NOT FALSE" -> true  
        "TRUE OR (FALSE AND (NOT (FALSE)))" -> true
- validate expression
    - Expression must start with Expression or NOT
        > (()) -> ok  
        (NOT ()) -> ok  
        (OR ()) -> not ok
        (AND ()) -> not ok
    - Expression must be followed by Binary Operator or nothing
        >() -> ok  
        () OR -> not ok  
        () AND -> not ok
    - Binary Operator must be followed by Expression
        >() OR () -> ok  
        () OR AND () -> not ok
        () AND OR () -> not ok
    - `NOT` Operator must be followed by Expression
        >NOT () -> ok  
        NOT AND -> not ok  
        NOT OR -> not ok
    - Parenthesis
        - Each opening bracket must be closed by a closing bracket.
        - Opening brackets must be closed in the correct order. That means no closing bracket should interrupt the corresponding pair of an opening bracket.
        - Each closing bracket must have an associated opening bracket before it.
- identify expressions
    - from a valid boolean string, based on the rules, the Boolean Calculator should be able to build up the Expressions
    > "TRUE OR TRUE OR TRUE AND FALSE" ->  
    "(TRUE OR (TRUE OR (TRUE AND FALSE)))"  
      
    > "TRUE OR FALSE AND NOT FALSE" ->  
    "(TRUE OR (FALSE AND (NOT (FALSE))))"


### ARCH

A1 - Algorithm to group expressions by precedence

    1. Extract Expressions from parentheses in order -> recursive // enough in V2
    2. Group NOTs in order
    3. Group ANDs in order
    4. Group ORs in order

    Input:

    TRUE AND (FALSE AND (TRUE OR FALSE)) AND NOT TRUE AND TRUE OR NOT (FALSE OR TRUE) OR TRUE

    TRUE AND [FALSE AND (TRUE OR FALSE)] AND NOT TRUE AND TRUE OR NOT (FALSE OR TRUE) OR TRUE // extract expressions
    TRUE AND [FALSE AND [TRUE OR FALSE]] AND NOT TRUE AND TRUE OR NOT (FALSE OR TRUE) OR TRUE // extract expressions
    TRUE AND [FALSE AND [TRUE OR FALSE]] AND NOT TRUE AND TRUE OR NOT [FALSE OR TRUE] OR TRUE // extract expressions

    TRUE AND [FALSE AND [TRUE OR FALSE]] AND [NOT TRUE] AND TRUE OR NOT [FALSE OR TRUE] OR TRUE // Group NOTs in order
    TRUE AND [FALSE AND [TRUE OR FALSE]] AND [NOT TRUE] AND TRUE OR [NOT [FALSE OR TRUE]] OR TRUE // Group NOTs in order
    [TRUE AND [FALSE AND [TRUE OR FALSE]]] AND [NOT TRUE] AND TRUE OR [NOT [FALSE OR TRUE]] OR TRUE // Group ANDs in order
    [[TRUE AND [FALSE AND [TRUE OR FALSE]]] AND [NOT TRUE]] AND TRUE OR [NOT [FALSE OR TRUE]] OR TRUE // Group ANDs in order
    [[[TRUE AND [FALSE AND [TRUE OR FALSE]]] AND [NOT TRUE]] AND TRUE] OR [NOT [FALSE OR TRUE]] OR TRUE // Group ANDs in order
    [[[[TRUE AND [FALSE AND [TRUE OR FALSE]]] AND [NOT TRUE]] AND TRUE] OR [NOT [FALSE OR TRUE]]] OR TRUE // Group ORs in order
    [[[[[TRUE AND [FALSE AND [TRUE OR FALSE]]] AND [NOT TRUE]] AND TRUE] OR [NOT [FALSE OR TRUE]]] OR TRUE] // Group ORs in order

A2 - Algorithm to handle parentheses

    1. Split up string by parentheses
    2. Turn string in parentheses into expression with Operators using A1 
        - A1 will invoke A2 recursively if there're parentheses inside parentheses
    3. Join array
    4. Run A1 on the whole

    Input:

    (TRUE OR TRUE OR TRUE) AND FALSE AND ((TRUE OR FALSE) AND TRUE) AND FALSE

    (TRUE OR TRUE OR TRUE) | AND FALSE AND | ((TRUE OR FALSE) AND TRUE) | AND FALSE // Split up string by parentheses
    [[TRUE OR TRUE] OR TRUE] | AND FALSE AND | [[TRUE OR FALSE] AND TRUE] | AND FALSE // Turn string in parentheses into expression
    [[TRUE OR TRUE] OR TRUE] AND FALSE AND [[TRUE OR FALSE] AND TRUE] AND FALSE // Join
    [[[[[TRUE OR TRUE] OR TRUE] AND FALSE] AND [[TRUE OR FALSE] AND TRUE]] AND FALSE] // Run A1 on the whole