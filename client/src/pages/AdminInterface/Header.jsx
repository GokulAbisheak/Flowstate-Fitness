import React from 'react';
import { useTheme, IconButton, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state/';
import { NightsStay, LightMode, Menu as MenuIcon } from '@mui/icons-material';
import FlexBetween from '../../components/FlexBetween';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(setLogout())
        setAnchorEl(null);
        navigate('/login')
    };

    return (
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

                    var sidenav = document.getElementById("side-nav");
                    if (sidenav.className === "side-nav") {
                        sidenav.className += " responsive";
                    } else {
                        sidenav.className = "side-nav";
                    }
                }} sx={{ display: { sm: "block", md: "none" }, paddingBottom: { sm: "4px", md: "2px" } }}>
                    <MenuIcon sx={{ fontSize: "25px" }}></MenuIcon>
                </IconButton>
                <Typography id='brand-name' variant="h6"
                    component={Link}
                    to="/"
                    margin="0px"
                    sx={{ display: { xs: "inherit", md: "none" }, color: "inherit" }} >
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
                <Avatar alt="Flowstate" src="/assets/user.jpg" sx={{ width: "32px", height: "32px" }} onClick={handleClick} />
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </FlexBetween>
        </FlexBetween>
    );
}

export default Header;
