import UsersService from '../users.service';

class UserStorage {
    
    isUserSet() {
        const user = localStorage.getItem('user.me');
        if (user) return true;
        return false;
    }
    async getUser() {
        let user = localStorage.getItem('user.me')
        if (user) {
            return user;
        } else {
            const response = await UsersService.me();
            if (response.statusCode === 200 && response.statusText === 'OK') {
                localStorage.setItem('user.me', response.items);
                return localStorage.getItem('user.me');
            }
    }
    }

    removeUserProfile() {
        localStorage.removeItem('user.me');
    }

    clean() {  
        this.removeUserProfile();  
    }
}

export default new UserStorage();
