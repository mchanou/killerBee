import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserContext from '../services/UserContext';
import userStorage from '../services/storage/user.storage';
import Loading from '../components/Loading';

const PrivateRoute = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const [logged, setLogged] = useState(true);

    //Load user and settings data
    function loadUser() {
        if(!logged){
            setLoading(true);
            userStorage.getUser().then((rsp) => {
                setUser(rsp);
            });
            setLoading(false);
        }
    }
    useEffect(() => {
        loadUser();
        if (!userStorage.isUserSet() && !logged) {
            window.location.href = '/login';
        }
    }, []);

    //if user is not set, return to Login page
    if (loading && !user) {
        return <Loading />;
    } else if (user || logged) {
        return (
            <UserContext.Provider
                value={{ user, setUser }}
            >
                <Outlet />
            </UserContext.Provider>
        );
    } else if (!user && !loading) {
        return <></>;
    }
};

export default PrivateRoute;
