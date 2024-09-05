import { Expression } from "./Expression"
import { Value } from "./Value";

describe('Expression', ()=>{

    describe('It should be able to parse a valid boolean string into a list of Values, Operators and Expressions', ()=>{
        
        it('Should be able to parse "TRUE" as Value.TRUE', ()=>{
            // arrange
            const boolString = 'TRUE';

            // act
            const expression = new Expression(boolString);

            // assert
            expect(expression.list[0]).toBe(Value.TRUE);
        })

    })

})