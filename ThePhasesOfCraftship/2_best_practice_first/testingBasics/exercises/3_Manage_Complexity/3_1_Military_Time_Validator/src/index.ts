export const militaryTimeValidator = (time: string): boolean => {
    const formatMatches =  time.length === 13 &&
    time.indexOf(' - ') > 0 &&
    time.lastIndexOf(':') === 10 &&
    time.indexOf(':') === 2;

    if(!formatMatches){
        return false;
    }

    if(parseInt(time.slice(0, 2)) > 24){
        return false
    }

    if(parseInt(time.slice(8, 10)) > 24){
        return false
    }

    return true;
}