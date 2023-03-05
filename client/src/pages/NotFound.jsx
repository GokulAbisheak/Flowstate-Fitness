import { Box, Grid, Typography, Button, useTheme } from '@mui/material';
import React from 'react';
import '../styles/index.css';
import Header from './AdminInterface/Header';
import ArrowBackIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Box className="center" sx={{ width: { xs: "100%", md: "50%" } }}>
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={12} md={6}>
                            <Typography variant='h1' sx={{ fontSize: "128px" }}>404</Typography>
                            <Typography variant='h4'>Page Not Found</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img style={{ maxWidth: "400px" }} src="/assets/404-error-animated.svg" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => navigate('/')} color='error' variant="contained" sx={{ paddingRight: "25px" }}><ArrowBackIcon></ArrowBackIcon> Go Back</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default NotFound;
