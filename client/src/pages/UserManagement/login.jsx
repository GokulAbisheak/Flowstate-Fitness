import { Box, Button, Grid, Link, TextField, useTheme } from '@mui/material';
import React from 'react';

const Login = () => {

    const theme = useTheme();

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={6} display="flex" justifyContent="center" alignItems="center" minHeight="90vh" sx={{ display: { xs: "none", lg: "flex" } }}>
                    <img style={{ width: "80%", height: "auto" }} src="/assets/gym-animate.svg" />
                </Grid>
                <Grid item xs={12} lg={6} display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
                    <Box backgroundColor={theme.palette.background.alt}
                        margin="50px auto"
                        width="100%"
                        boxShadow="0px 0px 10px rgba(0,0,0,0.3)"
                        borderRadius="10px"
                        padding="20px"
                        textAlign="center"
                        sx={{ maxWidth: { xs: "350px", md: "500px" } }}>

                        <img src={
                            theme.palette.mode === 'dark'
                                ? '/assets/semi-white.png'
                                : '/assets/semi-black.png'
                        } style={{ width: "150px", margin: "10px" }} />


                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            sx={{
                                width: "100%",
                                marginBottom: "10px"
                            }}
                        />

                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            sx={{
                                width: "100%",
                                marginBottom: "10px"
                            }}
                        />

                        <Button variant="contained" sx={{ margin: "20px auto", width: "100%", color: "#FFFFFF" }}>
                            login
                        </Button>
                        <Link href="#" underline="hover">
                            Forgot Password?
                        </Link>
                    </Box>
                </Grid>
            </Grid>

            {document.addEventListener('DOMContentLoaded', function () {window.setTimeout(document.querySelector('svg').classList.add('animated'),1000);})}
        </>
    );
}

export default Login;
