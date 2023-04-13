import React from 'react';
import { useTheme, IconButton, Typography, Avatar, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../state';
import { NightsStay, LightMode, Menu, ShoppingCart } from '@mui/icons-material';
import FlexBetween from '../../components/FlexBetween';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/index.css'

const Header = () => {

    const dispatch = useDispatch();
    const theme = useTheme();
    const navigate = useNavigate();

    const NavDetails = [
        {
            title: "Home",
            link: "",
        },

        {
            title: "Blog",
            link: "",
        },

        {
            title: "About",
            link: "",
        },

        {
            title: "Training",
            link: "",
        },

        {
            title: "Membership",
            link: "/user/membership",
        },

        {
            title: "Products",
            link: "",
        },

        {
            title: "Contact",
            link: "",
        },
    ]

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
                        <Menu sx={{ fontSize: "25px" }}></Menu>
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
                    <IconButton sx={{ marginRight: "5px" }}>
                        <ShoppingCart sx={{ fontSize: "25px"}} />
                    </IconButton>
                    <IconButton sx={{ marginRight: "5px" }} onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <LightMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <NightsStay sx={{ fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <Avatar alt="Cindy Baker" src="/assets/user.jpg" sx={{ width: "32px", height: "32px" }} />
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
