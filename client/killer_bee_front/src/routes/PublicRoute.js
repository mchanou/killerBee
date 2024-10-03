import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UserStorage from '../services/storage/user.storage';
import UserContext from '../services/UserContext';

const PublicRoute = () => {
    const { user } = useContext(UserContext);

    //Check if logged in, return to home page if already logged in
    React.useEffect(() => {
        if (UserStorage.isUserSet()) {
            window.location.href = '/';
        } else {
            return;
        }
    }, []);

    return (
        <>
            {!user ? (
                <UserContext.Provider>
                    <Outlet />
                </UserContext.Provider>
            ) : (
                <Navigate to="/" replace={true} />
            )}
        </>
    );
};

export default PublicRoute;
