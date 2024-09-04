const validateHour = (hour:string) => {
    const parsedHour = parseInt(hour);
    return !isNaN(parsedHour) && parsedHour < 24;
}

export const militaryTimeValidator = (time: string): boolean => {
    const formatMatches =  time.length === 13 &&
    time.indexOf(' - ') > 0 &&
    time.lastIndexOf(':') === 10 &&
    time.indexOf(':') === 2;

    if(!formatMatches){
        return false;
    }

    if(!validateHour(time.slice(0, 2))){
        return false
    }

    if(!validateHour(time.slice(8, 10))){
        return false
    }

    if(parseInt(time.slice(3, 5)) > 59){
        return false
    }

    if(parseInt(time.slice(11, 13)) > 59){
        return false
    }

    return true;
}