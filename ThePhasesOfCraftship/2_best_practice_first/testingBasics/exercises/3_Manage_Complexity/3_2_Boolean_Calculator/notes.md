**Description**: Create a boolean calculator that takes a boolean expression (as a string) and evaluates it to compute the correct output boolean result

## UPFRONT DESIGN

### FIND

#### Responsibilities
- evaluate string boolean expression to boolean result
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


    