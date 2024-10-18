import {
    AccountCircle,
    LoginOutlined,
    MenuOpen,
    Menu,
    Description,
    Settings,
    Home,
} from '@mui/icons-material';
import {
    AppBar,
    Toolbar,
    Typography,
    useTheme,
    IconButton,
    Button,
    Drawer,
} from '@mui/material';
import {Link, Outlet } from 'react-router-dom';
import * as React from 'react';
import { useState, useContext } from 'react';
import UserContext from '../services/UserContext';
import authService from '../services/auth.service';
import { blue } from '@mui/material/colors';
import KillerBeeLogo from '../assets/killerBeeLogo.png'

function Header() {
    const theme = useTheme();
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const date = new Date();
    const currentYear = date.getFullYear();
    function toggleDrawer() {
        setOpen(!open);
    }

    function logOut() {
        //Maybe add a confirmation before logging out
        authService.logout();
    }

    return (
        <>
            <AppBar
                position="static"
                sx={(theme) => ({
                    backgroundColor: blue,
                    borderRadius: 1,
                })}
            >
                <Toolbar>
                    <div className=" flex items-center">
                        <div className="flex flex-row">
                            <Link to="/">
                                <div className="flex items-center">
                                    <img
                                        className="h-20 w-55"
                                        src={KillerBeeLogo}
                                        alt="KillerBee Logo"
                                    />

                                    <Typography
                                        variant="h5"
                                        component="h1"
                                    >
                                        KillerBee
                                    </Typography>
                                </div>
                            </Link>
                        </div>

                        <div className="flex items-center absolute right-2">
                            <Typography
                                component="div"
                                variant="h6"
                                sx={[
                                    { display: { xs: 'block' }, marginRight: 2 }
                                    
                                ]}
                                className='ring'
                            >
                                Welcome 
                                <span className="capitalize">
                                    {user ? " " + user : " User"}
                                </span>
                            </Typography>

                            <IconButton
                                size="small"
                                onClick={logOut}
                            >
                                <Link>
                                    <LoginOutlined
                                    className='text-white hover:text-sky-900'
                                    />
                                </Link>
                            </IconButton>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    );
}

export default Header;
