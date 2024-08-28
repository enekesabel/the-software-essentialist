const throwValidationError = ()=>{
    throw new Error('The input must be a number between 1 and 100.');
}

export const fizzBuzz = (value: number ) => {

    if(typeof value !== 'number' || value > 100 || value < 1){
        return throwValidationError();
    }

    if(value % 3 === 0 && value % 5 === 0){
        return 'FizzBuzz';
    }

    if(value % 5 === 0){
        return 'Buzz';
    }

    if(value % 3 === 0){
        return 'Fizz';
    }

    return String(value);
}