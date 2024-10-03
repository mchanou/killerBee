import { createContext } from 'react';

const UserContext = createContext({
    user: null,
    setUser: (item) => {},
});

export default UserContext;
