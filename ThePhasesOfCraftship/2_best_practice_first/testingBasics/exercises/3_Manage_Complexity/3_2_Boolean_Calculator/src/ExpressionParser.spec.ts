import { ExpressionParser } from "./ExpressionParser";

describe('ExpressionParser', ()=>{
    
    it('Should be able to parse "TRUE" as true', ()=>{
        // arrange
        const booleanStr = 'TRUE';

        // act
        const expression = ExpressionParser.Parse(booleanStr);

        // assert
        expect(expression).toEqual([true]);
    })

})