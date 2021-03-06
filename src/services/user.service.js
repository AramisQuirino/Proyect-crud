import { authHeader, config } from '../helpers';
 
export const userService = {
    login,
    logout,
    getAll,
    update,
    delete: _delete,
    add
};
 
function login(usuario, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
    };
 
    return fetch(config.apiUrl + '/Auth/login', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
 
            return user;
        });
}
 
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
 
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
 
    return fetch(config.apiUrl + '/recibo', requestOptions)
    .then(handleResponse)
    .then(r => {
        return r
    })
    .catch(handleError);
}

function add(user) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
 
    return fetch(config.apiUrl + '/recibo/', requestOptions)
    .then(handleResponse)
    .then(r => {
        alert('Se agrego correctamente')
        getAll()
        return r
    })
    .catch(handleError);
}
 
function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
 
    return fetch(config.apiUrl + '/recibo/' + user.reciboId, requestOptions)
    .then(handleResponse)
    .then(r => {
        alert('Se actualizo correctamente')
        return r
    })
    .catch(handleError);
}
 
function _delete(user) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
 
    return fetch(config.apiUrl + '/recibo/' + user.reciboId, requestOptions)
    .then(handleResponse)
    .then(r => {
        alert('Se borro correctamente')
        return r
    })
    .catch(handleError);
}
 
function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}
 
function handleError(error) {
    return Promise.reject(error && error.message);
}