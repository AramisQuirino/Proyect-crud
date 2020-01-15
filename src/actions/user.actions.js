import { userConstants } from '../constants/user.constants'
import { userService } from '../services/user.service'
import { history } from '../helpers/history'

export const userActions = {
    login,
    logout,
    register,
    getAll
}

function login(usuario, password){
    return async (dispatch) => {
        dispatch(request({usuario}))
        try {
            const user = await userService.login(usuario, password);
            dispatch(success(user));
        }
        catch(error) {
            dispatch(failure(error))
            alert('Usuario o cuenta incorrectos');
        }
    }
}

function logout() {
    userService.logout();
    return {
        type: userConstants.LOGOUT
    }
}

function register(usuario, password) {
    return async (dispatch) => {
        dispatch(request({usuario, password}))

        userService.register(usuario, password)
        .then(
            user => {
                dispatch(success())
                history.push('/login')
                dispatch(alert)
            }
        )
    }
}

function getAll() {
    return dispatch => {
        userService.getAll()
        .then(
            history.push('/crud')
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