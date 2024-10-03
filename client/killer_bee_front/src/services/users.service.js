import miAPI, {
    apiDELETE,
    apiGET,
    apiPATCH,
    apiPUT,
} from './apiManager';
import niAPI from './apiManager';

class UsersService {
    me() {
        return apiGET('/users/profile/user');
    }

    update(data) {
        return apiPUT('/users/profile/user', data);
    }

    // changePassword(data) {
    //     let pwd_data = {
    //         old: sha512(data.old),
    //         new: sha512(data.new),
    //         repeat: sha512(data.repeat),
    //     };

    //     return apiPATCH('/users/profile/password', pwd_data);
    // }

    getUsers(filters) {
        const params = new URLSearchParams({
            username: filters.username,
            role: filters.role,
            status: filters.status === 'all' ? '' : filters.status,
        });

        return apiGET('/users', { params });
    }

    deleteUser(id) {
        return apiDELETE('/users/' + id);
    }

    resetAccount(id) {
        return apiPUT('/users/reset/' + id);
    }
}

export default new UsersService();
