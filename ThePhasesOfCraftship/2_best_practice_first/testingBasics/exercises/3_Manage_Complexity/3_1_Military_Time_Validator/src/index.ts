export const militaryTimeValidator = (time: string): boolean => {
    const formatMatches =  time.length === 13 &&
    time.indexOf(' - ') > 0 &&
    time.lastIndexOf(':') === 10 &&
    time.indexOf(':') === 2;

    if(!formatMatches){
        return false;
    }

    if(parseInt(time.slice(0, 2)) > 23){
        return false
    }

    if(parseInt(time.slice(8, 10)) > 23){
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