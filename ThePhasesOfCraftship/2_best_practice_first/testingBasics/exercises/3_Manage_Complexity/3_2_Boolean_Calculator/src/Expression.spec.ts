import { Expression } from "./Expression"

describe('Expression', ()=>{

    describe('It should be able to parse a valid boolean string into a list of Values, Operators and Expressions', ()=>{
        
        it('Should hold the list', ()=>{
            // arrange
            const expression = new Expression();

            // assert
            expect(expression.list).toBeDefined();
        })

    })

})