import React from 'react';
import '../../styles/index.css';
import { Typography, useTheme, Box, styled, ListItemButton, ListItemText, ListItemIcon, ListItem } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
    PeopleAlt as PeopleAltIcon,
    Work as WorkIcon,
    Speed as DashboardIcon,
    MonetizationOn as FinanceIcon,
    ShoppingCart as ShoppingCartIcon,
    Book as BookIcon, Forum as ForumIcon,
    CalendarMonth as CalendarMonthIcon,
    Payment as PaymentIcon,
    Settings as SettingsIcon,
    CardMembership as MembershipIcon
} from '@mui/icons-material';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const SideNav = () => {

    const theme = useTheme();
    const location = useLocation().pathname;
    const navigate = useNavigate();

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon></DashboardIcon>,
            path: '/admin/dashboard',
        },

        {
            text: 'Users',
            icon: <PeopleAltIcon></PeopleAltIcon>,
            path: '/admin/users',
        },

        {
            text: 'Membership',
            icon: <MembershipIcon></MembershipIcon>,
            path: '/admin/membership',
        },

        {
            text: 'Trainers',
            icon: <WorkIcon></WorkIcon>,
            path: '/admin/trainers',
        },

        {
            text: 'Products',
            icon: <ShoppingCartIcon></ShoppingCartIcon>,
            path: '/admin/products',
        },

        {
            text: 'Finance',
            icon: <FinanceIcon></FinanceIcon>,
            path: '/admin/finance',
        },

        {
            text: 'Articles',
            icon: <BookIcon></BookIcon>,
            path: '/admin/articles',
        },

        {
            text: 'Schedule',
            icon: <CalendarMonthIcon></CalendarMonthIcon>,
            path: '/admin/schedule',
        },

        {
            text: 'Feedback',
            icon: <ForumIcon></ForumIcon>,
            path: '/admin/feedback',
        },

        {
            text: 'Payment',
            icon: <PaymentIcon></PaymentIcon>,
            path: '/admin/payment',
        },

        {
            text: 'Settings',
            icon: <SettingsIcon></SettingsIcon>,
            path: '/admin/settings',
        },

    ]

    return (
        <div id="side-nav" className="side-nav" >
            <Box width="100%" textAlign="center" sx={{color: "#FFFFFF"}}>
                <Typography variant="h6" component={Link} to="/" id="brand-name" margin="0px 0px 20px 0px" sx={{
                    display: { xs: "none", md: "inherit" },
                    position: "sticky",
                    top: "0px",
                    paddingTop: "20px",
                    color: "#FFFFFF",
                }} >
                    FLOWSTATE
                </Typography>
                <div className='side-nav-link-group'>

                    {menuItems.map(item => (
                        <ListItem button onClick={() => navigate(item.path)} key={item.text} sx={{
                            backgroundColor:
                                location === item.path
                                    ? "rgba(255, 255, 255, 0.3)"
                                    : "transparent",
                            '&:hover': {
                                backgroundColor:
                                    location === item.path
                                        ? "rgba(255, 255, 255, 0.3)"
                                        : "rgba(255, 255, 255, 0.1)",
                            },
                        }}>
                            <ListItemIcon  sx={{
                                color: "#FFFFFF",
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText disableTypography primary={item.text} sx={{
                                fontSize: "14px",
                                paddingLeft: "10px",
                            }} />
                            <KeyboardArrowRightIcon sx={{
                                display:
                                    location === item.path
                                        ? "inherit"
                                        : "none",
                            }}></KeyboardArrowRightIcon>
                        </ListItem>
                    ))
                    }

                </div>
            </Box>
        </div>
    );
}

export default SideNav;
