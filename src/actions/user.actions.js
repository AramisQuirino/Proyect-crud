import { userConstants } from '../constants/user.constants'
import { userService } from '../services/user.service'
import { history } from '../helpers/history'

export const userActions = {
    login,
    logout,
    register,
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

function register(usuario, password) {
    return async (dispatch) => {
        dispatch({type:userConstants.REGISTER_REQUEST})

        userService.register(usuario, password)
        .then(
            user => {
                dispatch({type:userConstants.REGISTER_SUCCESS})
                history.push('/login')
                alert('Proceso completo')

            }
        )
        .catch(
            error => {
                dispatch({type:userConstants.REGISTER_FAILURE})
                alert(error)
            }
        )
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
                alert(error)
            }
        )
    }
}



function update(user) {
    return async (dispatch) => {
        console.log('update_action')
        userService.update(user)
        .then(
            response => {
                const Recibo = response;
                console.log(Recibo)
                dispatch(updateRecibo(Recibo))
            }
        )
        .catch(
            error => {
                alert(error)
            }
        ) 
    }
}

function _delete(user) {
    return async (dispatch) => {
        console.log('delete_action')
        userService.delete(user)
        .then(
            response => {
                const Recibo = response;
                console.log(Recibo)
                dispatch(deleteRecibo(Recibo))
            }
        )
        .catch(
            error => {
                alert(error)
            }
        ) 
    }
}

function add(user) {
    return async (dispatch) => {
        console.log('add_action')
        userService.add(user)
        .then(
            response => {
                const Recibo = response;
                console.log(Recibo)
                dispatch(addRecibo(Recibo))
            }
        )
        .catch(
            error => {
                alert(error)
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

function updateRecibo(Recibo) {
    return {
        type:userConstants.UPDATE_RECIBO,
        Recibo,
    }
}

function deleteRecibo(Recibo) {
    return {
        type:userConstants.DELETE_RECIBO,
        Recibo,
    }
}

function addRecibo(Recibo) {
    return {
        type:userConstants.ADD_RECIBO,
        Recibo,
    }
}