import { alertConstants } from '../_constants/alert.constants'

export const alertActions = {
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