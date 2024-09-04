const validateHour = (hour:string) => {
    const parsedHour = parseInt(hour);
    return !isNaN(parsedHour) && parsedHour < 24;
}

const validateMinute = (minute:string) => {
    const parsedMinute = parseInt(minute);
    return !isNaN(parsedMinute) && parsedMinute < 60;
}

const hour = (time: string) => time.slice(0, 2);
const minute = (time: string) => time.slice(3, 5);
const startTime = (militaryTime: string) => militaryTime.slice(0, 5);
const endTime = (militaryTime: string) => militaryTime.slice(8, 13);

export const militaryTimeValidator = (militaryTime: string): boolean => {
    const formatMatches =  militaryTime.length === 13 &&
    militaryTime.indexOf(' - ') > 0 &&
    militaryTime.lastIndexOf(':') === 10 &&
    militaryTime.indexOf(':') === 2;

    if(!formatMatches){
        return false;
    }

    if(!validateHour(hour(startTime(militaryTime)))){
        return false
    }

    if(!validateHour(hour(endTime(militaryTime)))){
        return false
    }

    if(!validateMinute(minute(startTime(militaryTime)))){
        return false
    }

    if(!validateMinute(minute(endTime(militaryTime)))){
        return false
    }

    return true;
}