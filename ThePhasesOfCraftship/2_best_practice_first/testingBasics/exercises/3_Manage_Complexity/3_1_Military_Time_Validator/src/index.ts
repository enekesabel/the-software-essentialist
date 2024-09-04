export const militaryTimeValidator = (time: string): boolean => {
    return time.length === 13 &&
    time.indexOf(' - ') > 0 &&
    time.indexOf(':') === 2
}