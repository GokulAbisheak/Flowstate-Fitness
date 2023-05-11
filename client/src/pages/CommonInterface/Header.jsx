import React, { useEffect, useState } from 'react';
import { useTheme, IconButton, Typography, Avatar, Button, Box, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout, setMode } from '../../state';
import { NightsStay, LightMode, Menu as MenuIcon, ShoppingCart } from '@mui/icons-material';
import FlexBetween from '../../components/FlexBetween';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/index.css'
import axios from 'axios';

const Header = () => {

    const loggedUser = useSelector((state) => state.user)

    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();

    const [user, setUser] = useState();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = () => {
        navigate('user/profile')
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(setLogout())
        setAnchorEl(null);
        navigate('/login')
    };

    const NavDetails = [
        {
            title: "Home",
            link: "/user/home",
        },

        {
            title: "Blog",
            link: "/user/blog",
        },

        {
            title: "About",
            link: "/user/about",
        },

        {
            title: "Training",
            link: "/user/training",
        },

        {
            title: "Membership",
            link: "/user/membership",
        },

        {
            title: "Products",
            link: "/user/products",
        },

        {
            title: "Contact",
            link: "/user/contact",
        },
    ]

    useEffect(() => {
        const getUser = () => {
            axios.get('http://localhost:8090/user/' + loggedUser.email).then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        if (loggedUser != null) {
            getUser();
        }
    })

    return (
        <>
            <FlexBetween sx={{ zIndex: "1000" }} backgroundColor={theme.palette.background.alt}
                padding="10px 20px"
                height="64px"
                position="sticky"
                top="0px"
                width="100%"
                //display= "flex"
                boxShadow="0 5px 3px -3px #00000030"
            >
                <FlexBetween>
                    <IconButton onClick={() => {

                        var navList = document.getElementById("nav-list-responsive");
                        if (navList.className === "user-nav-list") {
                            navList.className += " responsive";
                        } else {
                            navList.className = "user-nav-list";
                        }
                    }} sx={{ display: { sm: "block", md: "none" }, paddingBottom: { sm: "4px", md: "2px" } }}>
                        <MenuIcon sx={{ fontSize: "25px" }}></MenuIcon>
                    </IconButton>
                    <Typography id='brand-name' variant="h6"
                        component={Link}
                        to="/"
                        margin="0px"
                        sx={{ color: "inherit" }} >
                        FLOWSTATE
                    </Typography>
                </FlexBetween>
                <FlexBetween sx={{ display: { xs: "none", md: "inherit" } }}>
                    {NavDetails.map(item => (
                        <Button onClick={() => {
                            navigate(item.link)
                        }} variant="text">{item.title}</Button>
                    ))
                    }
                </FlexBetween>
                <FlexBetween>
                    <IconButton sx={{ marginRight: "5px" }} onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <LightMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <NightsStay sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Button onClick={() => {navigate('/login')}}>
                        Login
                    </Button>
                    <Button onClick={() => {navigate('/signup')}}>
                        Sign up
                    </Button>
                </FlexBetween>
            </FlexBetween>
            <div id="nav-list-responsive" class="user-nav-list" style={{ backgroundColor: theme.palette.primary.main, opacity: "0.8", zIndex: "1000" }}>
                {NavDetails.map(item => (
                    <Button variant="text" sx={{ width: "100%", color: "#FFFFFF", '&:hover': { backgroundColor: "rgba(0,0,0,0.3)" } }}>{item.title}</Button>
                ))
                }
            </div>
        </>
    );
}

export default Header;
