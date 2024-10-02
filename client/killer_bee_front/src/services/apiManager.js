import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import AuthService from './auth.service';
import TokenStorage from '../storage/token.storage';
import swal from 'sweetalert';
import { parseISO, isAfter } from 'date-fns';
import tokenStorage from '../storage/token.storage';
import secureLocalStorage from 'react-secure-storage';
import userStorage from '../storage/user.storage';

//export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const BASE_URL = 'http://localhost:5000';
export const URL_REFRESH_TOKEN = '/token/refresh';

const miAPI = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const apiGET = (url, config) => {
    let state = {
        items: [],
        error: '',
        statusCode: '',
        statusText: '',
    };

    return miAPI
        .get(url, config)
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
                state.statusCode = response.status;
                state.statusText = response.statusText;
            } else {
                state.error = 'Unknown error';
            }
        })
        .catch((error) => {
            state.error = 'Unknown error';
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                )
                    return state;
                else networkError(state.error, 5000);
            } else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            } else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
};

export const apiPOST = (url, data) => {
    let state = {
        items: [],
        error: '',
        statusCode: '',
        statusText: '',
    };
    return miAPI
        .post(url, JSON.stringify(data))
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
                state.statusCode = response.status;
                state.statusText = response.statusText;
            } else {
                state.error = 'Unknown error';
                state.items = response;
            }
        })
        .catch((error) => {
            state.error = 'Unknown error';
            console.log(error.response);
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                ) {
                    state.error = error.response.status + error.message;
                    return state;
                } else networkError(state.error, 5000);
            } else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            } else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
};

export const apiPATCH = (url, data) => {
    let state = {
        items: [],
        error: '',
        statusCode: '',
        statusText: '',
    };

    return miAPI
        .patch(url, JSON.stringify(data))
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
                state.statusCode = response.status;
                state.statusText = response.statusText;
            } else {
                state.error = 'Unknown error';
            }
        })
        .catch((error) => {
            console.log(error.response);

            state.error = 'Unknown error';
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                )
                    return state;
                else networkError(state.error, 5000);
            } else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            } else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
};

export const apiPUT = (url, data) => {
    let state = {
        items: [],
        error: '',
        statusCode: '',
        statusText: '',
    };

    return miAPI
        .put(url, JSON.stringify(data))
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
                state.statusCode = response.status;
                state.statusText = response.statusText;
            } else {
                state.error = 'Unknown error';
            }
        })
        .catch((error) => {
            state.error = 'Unknown error';
            if (error.response) {
                console.log(error.response);
                state.error = error.response.data.error || error.message;
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                )
                    return state;
                else networkError(state.error, 5000);
            } else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            } else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
};

export const apiDELETE = (url) => {
    let state = {
        items: [],
        error: '',
        statusCode: '',
        StatusText: '',
    };

    return miAPI
        .delete(url)
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
                state.statusCode = response.status;
                state.statusText = response.statusText;
            } else {
                state.error = 'Unknown error';
            }
        })
        .catch((error) => {
            state.error = 'Unknown error';
            state.statusCode = error.response.status;
            state.statusText = error.response.statusText;
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                )
                    return state;
            } else if (error.message) {
                state.error = error.message;
            }
        })
        .then(() => {
            return state;
        });
};

export const apiUPLOAD = (url, data) => {
    let state = {
        items: [],
        error: '',
    };

    return miAPI
        .post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            if (response.status === 200) {
                state.items = response.data;
            } else {
                state.error = 'Unknown error';
            }
        })
        .catch((error) => {
            state.error = 'Unknown error';
            if (error.response) {
                state.error = error.response.data.error || error.message;
                if (
                    error.response.status === 401 ||
                    error.response.status === 403
                )
                    return state;
                else networkError(state.error, 5000);
            } else if (error.message) {
                state.error = error.message;
                networkError(state.error, 2000);
            } else {
                networkError(state.error, 2000);
            }
        })
        .then(() => {
            return state;
        });
};

const networkError = (message, timer) => {
    console.log(message);
    swal('Error', message, 'error', {
        buttons: false,
        timer: { timer },
    }).then(() => {
        AuthService.logout();
    });
};

// Obtain the fresh token each time the function is called
/*function getAccessToken(){
    return TokenStorage.getLocalAccessToken();
}
function getRefreshToken() {
    return TokenStorage.getRefreshToken();
}*/

// Use interceptor to inject the token to requests
miAPI.interceptors.request.use((request) => {
    request.headers[
        'Authorization'
    ] = `Bearer ${TokenStorage.getAccessToken()}`;
    return request;
});

// Function that will be called to refresh authorization
const refreshAuthLogic = async (failedRequest) => {
    // Check if the refresh token is stored in localStorage
    const refresh_token = TokenStorage.getRefreshToken();
    const date = parseISO(TokenStorage.getRefreshTokenExp());
    if (!refresh_token || isAfter(new Date(), date)) {
        let error = 'Your session has expired!';
        //if (error.response && error.response.statusText) error = _error.response.statusText;

        swal('Error', error, 'error', {
            buttons: false,
            timer: 2000,
        }).then(() => {
            userStorage.clean();
            tokenStorage.clean();
            localStorage.removeItem('token_refreshing');
            window.location.href = '/login';
            return Promise.resolve();
        });
    }

    /** NEW code **/
    //Check if refreshing
    const refreshing = localStorage.getItem('token_refreshing');
    if (refreshing === true) return Promise.resolve();
    localStorage.setItem('token_refreshing', 'true');

    //Call
    const response = await axios
        .post(BASE_URL + URL_REFRESH_TOKEN, {
            //token: TokenStorage.getAccessToken(),
            refresh_token: refresh_token,
        })
        .then((rsp) => {
            if (rsp.status === 200 && rsp.statusText === 'OK') {
                // Update the access token and refresh token in localStorage
                TokenStorage.setAccessToken(response.data.access_token);
                TokenStorage.setRefreshToken(response.data.refresh_token);

                // Update the Authorization header of the failed request with the new access token
                failedRequest.response.config.headers['Authorization'] =
                    'Bearer ' + response.data.access_token;

                // Notify other tabs that the token has been refreshed
                localStorage.setItem(
                    'tmp_access_token',
                    response.data.access_token
                );
                localStorage.setItem(
                    'tmp_refresh_token',
                    response.data.refresh_token
                );
                localStorage.setItem('token_refreshed', Date.now().toString());

                return Promise.resolve();
            } else {
                let error = 'Your session has expired!';
                //if (error.response && error.response.statusText) error = _error.response.statusText;

                swal('Error', error, 'error', {
                    buttons: false,
                    timer: 2000,
                });

                AuthService.logout();
                // Clear the refreshing flag
                localStorage.setItem('token_refreshing', 'false');
                return Promise.reject();
            }
        });

    //Don't display error when not logged in
    const token = TokenStorage.getAccessToken();
    if (!token) {
        AuthService.logout();
        return Promise.reject();
    }

    /** NEW code **/

    /*
    // Check if the token is already being refreshed
    const refreshing = localStorage.getItem("token_refreshing");
    if (refreshing === "true") {
        return Promise.resolve();
    }

    // Set the refreshing flag
    localStorage.setItem("token_refreshing", "true");

    return axios
        .post(BASE_URL + URL_REFRESH_TOKEN,
            {
                //token: TokenStorage.getAccessToken(),
                refresh_token: refresh_token
            })
        .then(tokenRefreshResponse => {
            // Update the access token and refresh token in localStorage
            TokenStorage.setAccessToken(tokenRefreshResponse.data.acces_token);
            TokenStorage.setRefreshToken(tokenRefreshResponse.data.refresh_token);

            // Update the Authorization header of the failed request with the new access token
            failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.acces_token;

            // Notify other tabs that the token has been refreshed
            localStorage.setItem("tmp_access_token", tokenRefreshResponse.data.acces_token);
            localStorage.setItem("tmp_refresh_token", tokenRefreshResponse.data.refresh_token);
            localStorage.setItem("token_refreshed", Date.now().toString());

            return Promise.resolve();
        })
        .catch(() => {

            //Don't display error when not logged in
            const token = TokenStorage.getAccessToken();
            if (!token) {
                AuthService.logout();
            }

            let error = "Your session has expired!";
            //if (error.response && error.response.statusText) error = _error.response.statusText;
            swal("Error", error, "error", {
                buttons: false,
                timer: 2000,
            }).then(() => {
                AuthService.logout();
            });
        })
        .finally(() => {
            // Clear the refreshing flag
            localStorage.setItem("token_refreshing", "false");
        });;*/
};

// Listen for the storage event on window
window.addEventListener('storage', (event) => {
    if (event.key === 'token_refreshed') {
        //Get temp token
        const accessToken = localStorage.getItem('tmp_access_token');
        const refreshToken = localStorage.getItem('tmp_refresh_token');

        //Update Token
        if (accessToken != null && refreshToken != null) {
            TokenStorage.setAccessToken(accessToken);
            TokenStorage.setRefreshToken(refreshToken);
        }

        //Clean tmp
        localStorage.removeItem('tmp_access_token');
        localStorage.removeItem('tmp_refresh_token');
    }
});

// // Chech refresh token expiration date
// document.addEventListener('DOMContentLoaded', () => {
//     if (secureLocalStorage.getItem('user.me')) {
//         const refresh_token = tokenStorage.getRefreshToken();
//         const date = parseISO(TokenStorage.getRefreshTokenExp());
//         if (!refresh_token || isAfter(new Date(), date)) {
//             AuthService.logout();
//             return Promise.resolve();
//         }
//     }
// });

// Instantiate the interceptor
createAuthRefreshInterceptor(miAPI, refreshAuthLogic, {
    statusCodes: [401, 403],
});

export default miAPI;
