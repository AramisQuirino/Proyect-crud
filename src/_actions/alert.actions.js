import { alertConstants } from '../_constants'

export const alertConstants = {
    success,
    error,
    clear
}

function success(message){
    return { type: alertConstants.success, message }
}

function error(message){
    return { type: alertConstants.error, message }
}

function clear(){
    return { type: alertConstants.clear }
}