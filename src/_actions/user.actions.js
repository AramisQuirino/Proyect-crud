import { userConstants } from '../_constants/user.constants'
import { userService } from '../_services/user.service'
//import { alertActions } from './alert.actions'
import { history } from '../_helpers/history'

export const userActions = {
    login,
    logout,
    register
}

function login(usuario, password){
    return dispatch => {
        dispatch(request({usuario}))

        userService.login(usuario, password)
        .then(
            user => {
                dispatch(success(user))
                history.push('/')
            },
            error => {
                dispatch(failure(error))
                //dispatch(alertActions.error(error))
            }
        )
    }
}

function logout() {
    userService.logout();
    return {
        type: userConstants.LOGOUT
    }
}

function register(user) {
    return dispatch => {
        dispatch(request(user))

        userService.register(user)
        .then(
            user => {
                dispatch(success())
                history.push('/login')
                dispatch(alert)
            }
        )
    }
}

function request(user) {
    return {
        type:userConstants.LOGIN_REQUEST, 
        user
    }
}

function success(user) {
    return {
        type:userConstants.LOGIN_SUCCESS, 
        user
    }
}

function failure(error) {
    return {
        type:userConstants.LOGIN_FAILURE, 
        error
    }
}