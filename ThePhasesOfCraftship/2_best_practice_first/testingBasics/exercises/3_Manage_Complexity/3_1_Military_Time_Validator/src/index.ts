const validateHour = (hour:string) => {
    
    const parsedHour = Number(hour);
    return !isNaN(parsedHour) && parsedHour < 24;
}

const validateMinute = (minute:string) => {
    const parsedMinute = parseInt(minute);
    return !isNaN(parsedMinute) && parsedMinute < 60;
}

const getHour = (time: string) => time.slice(0, 2);
const getMinute = (time: string) => time.slice(3, 5);
const getStartTime = (militaryTime: string) => militaryTime.slice(0, 5);
const getEndTime = (militaryTime: string) => militaryTime.slice(8, 13);

export const militaryTimeValidator = (militaryTime: string): boolean => {
    const formatMatches =  militaryTime.length === 13 &&
    militaryTime.indexOf(' - ') > 0 &&
    militaryTime.lastIndexOf(':') === 10 &&
    militaryTime.indexOf(':') === 2;

    if(!formatMatches){
        return false;
    }

    const startTime = getStartTime(militaryTime);
    const endTime = getEndTime(militaryTime);

    return validateHour(getHour(startTime)) &&
    validateHour(getHour(endTime)) &&
    validateMinute(getMinute(startTime)) &&
    validateMinute(getMinute(endTime))
}