import { time } from "console";

const validateHour = (hour:string) => {
    const parsedHour = parseInt(hour);
    return !isNaN(parsedHour) && parsedHour < 24;
}

const hour = (time: string) => time.slice(0, 2);
const startTime = (militaryTime: string) => militaryTime.slice(0, 4);

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

    if(!validateHour(militaryTime.slice(8, 10))){
        return false
    }

    if(parseInt(militaryTime.slice(3, 5)) > 59){
        return false
    }

    if(parseInt(militaryTime.slice(11, 13)) > 59){
        return false
    }

    return true;
}