import { format } from 'date-fns'

const getTime = () => {
    
    // Get the hours, minutes from the current time
    return format(new Date(), "HH:mm")
}

const formatDigit = (number) => {

    if(number < 10)
        return "0" + number

    return number
}

export const getDateTime = () => {
    return format(new Date(), "dd-MM-yyyy HH:mm:ss")
}

export default getTime
