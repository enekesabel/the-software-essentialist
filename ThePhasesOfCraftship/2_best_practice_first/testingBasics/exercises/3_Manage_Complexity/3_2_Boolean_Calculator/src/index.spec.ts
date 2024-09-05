import { BooleanCalculator } from ".";

describe('boolean calculator', () => {

    it('Should evaluate "TRUE" to true', ()=>{
        // arrange
        const expression = 'TRUE';

        // act
        const result = BooleanCalculator.Evaluate(expression);

        // assert
        expect(result).toBe(true);
    })

})
