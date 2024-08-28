import { fizzBuzz } from "./fizzbuzz";

describe("fizzbuzz", () => {

    describe('Should return the numbers as strings', ()=>{

        test('It should always return a string', ()=> {
            expect(typeof fizzBuzz(10)).toBe('string');
        })
    
        test('43 returns "43"', ()=>{
            expect(fizzBuzz(43)).toBe('43');        
        })
    
    })

    describe('For numbers that are multiples of both three and five, it returns “FizzBuzz.”', ()=>{
        
        test('15 returns "FizzBuzz"', ()=>{
            expect(fizzBuzz(15)).toBe('FizzBuzz');        
        })
        
        test('45 returns "FizzBuzz"', ()=>{
            expect(fizzBuzz(45)).toBe('FizzBuzz');        
        })
        
    })

    describe('For multiples of three it returns “Fizz”', ()=>{

        test('3 returns "Fizz"', ()=>{
            expect(fizzBuzz(3)).toBe('Fizz');        
        })    

        test('9 returns "Fizz"', ()=>{
            expect(fizzBuzz(9)).toBe('Fizz');        
        })

        test('42 returns "Fizz"', ()=>{
            expect(fizzBuzz(42)).toBe('Fizz');        
        })
    
    })

    describe('For multiples of five it returns “Buzz”', ()=>{

        test('5 returns "Buzz"', ()=>{
            expect(fizzBuzz(5)).toBe('Buzz');        
        })

    })

});
