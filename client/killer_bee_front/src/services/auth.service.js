import axios from 'axios';
import api from './apiManager';
import UserStorage from '../services/storage/user.storage'

const login_axios = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

class AuthService {
    login(username, password) {
        let state = {
            items: [],
            error: '',
            challenge: '',
        };

        return login_axios
            .post('/api/auth', {
                username: username,
                password: password,
            })
            .then((response) => {
                //Clean Storage
                UserStorage.clean();

                if (response.status === 200) {
                    //Load User Settings
                    UserStorage.getUser().then();
                   
                } else {
                    state.error = 'Unknown error';
                }
            })
            .catch((error) => {
                state.error = error.response
                    ? error.response.data
                    : 'Unknown error';
            })
            .then(() => {
                return state;
            });
    }

    forgotPassword(login) {
        let state = {
            items: [],
            error: '',
        };

        return login_axios
            .post('/auth/forgot', { login: login })
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
                    state.error = error.response.data || error.message;
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
    }

    activate(login, activation_code, password, password_confirm) {
        let state = {
            items: [],
            error: '',
        };

        return login_axios
            .post('auth/activate', {
                login: login,
                activation_code: activation_code,
                password: password,
                password_confirm: password_confirm,
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
                    state.error = error.response.data || error.message;
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
    }

    resetPassword(login, reset_code, password, password_confirm) {
        let state = {
            items: [],
            error: '',
        };

        return login_axios
            .post('/auth/reset', {
                login: login,
                reset_code: reset_code,
                password: password,
                password_confirm: password_confirm,
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
                    state.error = error.response.data || error.message;
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
    }

    // logout() {
    //     api.post('token/logout', {}).then(() => {
    //         //Clean all local storage
    //         localStorage.clear();
    //         UserStorage.clean();

    //         window.location.href = '/login';
    //     });
    // }
}

export default new AuthService();
