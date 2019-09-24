const getTime = () => {
    
    // Gets the current time
    const now = new Date()

    // Get the hours, minutes and seconds from the current time
    const hours = formatDigit(now.getHours())
    const minutes = formatDigit(now.getMinutes())

    return hours + ':' + minutes
}

const formatDigit = (number) => {

    if(number < 10)
        return "0" + number

    return number
}

export const getDateTime = () => {
    
    // Gets the current time
    const now = new Date()

    // Get the hours, minutes and seconds from the current time
    let date = formatDigit(now.getDate())
    let month = formatDigit(now.getMonth())
    let year = now.getYear()
    let hours = formatDigit(now.getHours())
    let minutes = formatDigit(now.getMinutes())
    let seconds = formatDigit(now.getSeconds())

    return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`
}

export default getTime