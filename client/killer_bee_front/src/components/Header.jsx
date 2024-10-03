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
import { NavLink, Link, Outlet } from 'react-router-dom';
import * as React from 'react';
import { useState, useContext } from 'react';
import UserContext from '../services/UserContext';
import authService from '../services/auth.service';

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
                    backgroundColor: theme.palette.secondary.dark,
                    borderRadius: 1,
                })}
            >
                <Toolbar>
                    <div className=" flex items-center">
                        <div className="flex flex-row">
                            <Button onClick={toggleDrawer}>
                                {open ? <MenuOpen /> : <Menu />}
                            </Button>

                            <Link to="/">
                                <div className="flex items-center">
                                    {/* <img
                                        className="h-20 w-55"
                                        src={PerennityLogo}
                                        alt="Perennity Logo"
                                    /> */}

                                    <Typography
                                        variant="h5"
                                        component="h1"
                                        style={{
                                            color: theme.palette.primary.light,
                                        }}
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
                                    { display: { xs: 'block' } },
                                    (theme) => ({
                                        color: theme.palette.primary.light,
                                    }),
                                ]}
                            >
                                Welcome
                                <span className="capitalize">
                                    {user?.title} {user?.first_name}{' '}
                                    {user?.last_name}
                                </span>
                            </Typography>

                            <IconButton
                                size="small"
                                disableFocusRipple
                                sx={(theme) => ({
                                    '&:hover': {
                                        backgroundColor:
                                            theme.palette.secondary.dark,
                                    },
                                })}
                            >
                                <Link to="/profile">
                                    <AccountCircle
                                        sx={[
                                            { cursor: 'pointer' },
                                            (theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                '&:hover': {
                                                    color: theme.palette.primary
                                                        .light,
                                                },
                                            }),
                                        ]}
                                    />
                                </Link>
                            </IconButton>

                            <IconButton
                                size="small"
                                sx={(theme) => ({
                                    '&:hover': {
                                        backgroundColor:
                                            theme.palette.secondary.dark,
                                    },
                                })}
                                onClick={logOut}
                            >
                                <Link>
                                    <LoginOutlined
                                        sx={[
                                            { cursor: 'pointer' },
                                            (theme) => ({
                                                color: theme.palette.text
                                                    .primary,
                                                '&:hover': {
                                                    color: theme.palette.primary
                                                        .light,
                                                },
                                            }),
                                        ]}
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
