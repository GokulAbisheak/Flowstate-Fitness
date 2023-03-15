import React from 'react';
import { useTheme, IconButton, Typography, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../state';
import { NightsStay, LightMode, Menu } from '@mui/icons-material';
import FlexBetween from '../../components/FlexBetween';
import { Link } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <FlexBetween backgroundColor={theme.palette.background.alt}
            padding="10px 20px"
            height="64px"
            position="sticky"
            top="0px"
            width="100%"
        //display= "flex"
            boxShadow= "0 5px 3px -3px #00000030"
        >
            <FlexBetween>
                <IconButton onClick={() => {

                    var sidenav = document.getElementById("side-nav");
                    if (sidenav.className === "side-nav") {
                        sidenav.className += " responsive";
                    } else {
                        sidenav.className = "side-nav";
                    }
                }} sx={{ display: { sm: "block", md: "none" }, paddingBottom: { sm: "4px", md: "2px" } }}>
                    <Menu sx={{ fontSize: "25px" }}></Menu>
                </IconButton>
                <Typography id='brand-name' variant="h6"
                    component={Link}
                    to="/"
                    margin="0px"
                    sx={{ display: { xs: "inherit", md: "none" }, color: "inherit"}} >
                    FLOWSTATE
                </Typography>
            </FlexBetween>
            <FlexBetween>
                <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <LightMode sx={{ fontSize: "25px" }} />
                    ) : (
                        <NightsStay sx={{ fontSize: "25px" }} />
                    )}
                </IconButton>
                <Avatar alt="Cindy Baker" src="/assets/user.jpg" sx={{width: "32px", height: "32px"}} />
            </FlexBetween>
        </FlexBetween>
    );
}

export default Header;
