import axios from 'axios'

import Config from '../config/config'


const api = axios.create({
    baseURL: Config.api_url,
    timeout: 60000  // 60 seconds
});

/*const errorHandler = (error) => {
    let code = null;
    if (error != null && error['response'] != null) {
        code = error['response']['status'];
    }
    if (code === 401 || code === 403) {
        console.error('Unauthorized request. Go to login page ...');
        //window.location = '/login';
    }
    return Promise.reject({...error});
};


api.interceptors.response.use(null, errorHandler);*/


export const actions = {
    SET_USER: 'SET_USER'
};

function setToken(token) {
    if (token == null) {
        delete api.defaults.headers.common['Authorization'];
    } else {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
}

export const logoutSession = () => (dispatch) => {
    sessionStorage.clear();
    setToken(null);
    dispatch({type: actions.SET_USER, payload: null});
};

export const loadSession = () => (dispatch) => {
    const authData = JSON.parse(sessionStorage.getItem('auth_data'));
    if (authData != null) {
        setToken(authData['token']);
        dispatch({type: actions.SET_USER, payload: authData['user']});
    }
};

export const authenticate = (username, password, onSuccess, onError) => (dispatch) => {
    api.post('api/1/auth', {username: username, password: password}).then(response => {
        sessionStorage.setItem('auth_data', JSON.stringify(response.data));
        setToken(response.data['token']);
        dispatch({type: actions.SET_USER, payload: response.data['user']});
        onSuccess();
    }).catch(error => {
        onError(error);
    })
};

export const getTask = (taskID, onSuccess, onError) => (dispatch) => {
    api.get('api/1/service/task/' + taskID).then(response => {
        onSuccess(response);
    }).catch(error => {
        onError(error);
    })
};


/**
 * example implementation
 *
 * delete if not needed
 */


export const normalMessage = (onSuccess, onError) => (dispatch) => {
    api.get('api/1/norm').then(response => {
        onSuccess(response);
    }).catch(error => {
        onError(error);
    })
};

export const adminMessage = (onSuccess, onError) => (dispatch) => {
    api.get('api/1/secret').then(response => {
        onSuccess(response);
    }).catch(error => {
        onError(error);
    })
};

export const getLongMessage = (onSuccess, onError) => (dispatch) => {
    api.get('api/1/msg?param=long').then(response => {
        onSuccess(response.data['task_id']);
    }).catch(error => {
        onError(error);
    })
}

export const getErrorMessage = (onSuccess, onError) => (dispatch) => {
    api.get('api/1/msg?param=error').then(response => {
        onSuccess(response.data['task_id']);
    }).catch(error => {
        onError(error);
    })
}

export const getTemperatureData = (start, end, onSuccess, onError) => (dispatch) => {
    const startParam = start != null ? 'start=' + start: null;
    const endParam = end != null ? 'end=' + end: null;

    let url = 'api/1/temperature'
    if (startParam != null) {
        url += '?' + startParam;
        if (endParam != null) {
            url += '&' + endParam;
        }
    } else {
        if (endParam != null) {
            url += '?' + endParam
        }
    }

    api.get(url).then(response => {
        onSuccess(response);
    }).catch(error => {
        onError(error);
    })
};


/**
 * example implementation
 */
