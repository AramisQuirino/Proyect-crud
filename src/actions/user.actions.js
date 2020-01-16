import { userConstants } from '../constants/user.constants'
import { userService } from '../services/user.service'

export const userActions = {
    login,
    logout,
    getAll,
    update,
    _delete,
    add
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

function getAll() {
    return async (dispatch) => {
        dispatch({type:userConstants.GETALL_REQUEST})

        userService.getAll()
        .then(
            response => {
                const Recibo = response; 
                dispatch(setRecibo(Recibo)); 
            }
        )
        .catch(
            error => {
                dispatch({type:userConstants.GETALL_FAILURE})
                console.log(error)
            }
        )
    }
}



function update(user) {
    return async (dispatch) => {
        userService.update(user)
        .then(
            response => {
                const Recibo = response;
                console.log(Recibo)
                dispatch(getAll())
            }
        )
        .catch(
            error => {
                console.log(error)
            }
        ) 
    }
}

function _delete(user) {
    return async (dispatch) => {
        console.log('delete_action')
        userService.delete(user)
        .then(() => dispatch(getAll()))
        .catch(
            error => {
                console.log(error)
            }
        ) 
    }
}

function add(recibo) {
    return async (dispatch) => {
        userService.add(recibo)
        .then(() => dispatch(getAll()))
        .catch(
            error => {
                console.log(error)
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

function setRecibo(Recibo) {
    return {
        type:userConstants.SET_RECIBO,
        Recibo,
    }
}
