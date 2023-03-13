import { Box, Button, Grid, Link, TextField, useTheme } from '@mui/material';
import React from 'react';
import FlexBetween from '../../components/FlexBetween';
import InputField from '../../components/InputField';
import ReCAPTCHA from 'react-google-recaptcha'

const SignUp = () => {

    const theme = useTheme();

    function onChange(value) {
        console.log("Captcha value:", value);
    }

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={6} display="flex" justifyContent="center" alignItems="center" minHeight="90vh" sx={{ display: { xs: "none", lg: "flex" } }}>
                    <img style={{ width: "80%", height: "auto" }} src="/assets/pilates-animate.svg" />
                </Grid>
                <Grid item xs={12} lg={6} display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
                    <Box backgroundColor={theme.palette.background.alt}
                        margin="0px auto"
                        width="100%"
                        boxShadow="0px 0px 10px rgba(0,0,0,0.3)"
                        borderRadius="10px"
                        padding="20px"
                        textAlign="center"
                        sx={{ maxWidth: { xs: "100%", sm: "600px" }, backgroundColor: { xs: "transarent", md: theme.palette.background.alt}, boxShadow: { xs: "none", md: "0px 0px 10px rgba(0,0,0,0.3)" } }}>

                        <img src={
                            theme.palette.mode === 'dark'
                                ? '/assets/semi-white.png'
                                : '/assets/semi-black.png'
                        } style={{ width: "150px", margin: "10px" }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <InputField
                                    id="outlined-basic"
                                    label="First Name"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputField
                                    id="outlined-basic"
                                    label="Last Name"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <InputField
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputField
                                    id="outlined-basic"
                                    label="Password"
                                    variant="outlined"
                                    type="password"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputField
                                    id="outlined-basic"
                                    label="Confirm Password"
                                    variant="outlined"
                                    type="password"
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputField label="Date of Birth" variant='outlined' type="date" InputLabelProps={{ shrink: true }} />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <InputField label="Phone Number" variant='outlined' />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Box width="250px" margin="0px auto">
                                    <ReCAPTCHA
                                        sitekey="6Ld2reYkAAAAAD_zwIfgTotQoccN8SpSunomkCUn"
                                        onChange={onChange}
                                        theme={theme.palette.mode}
                                        style={{ transform: "scale(0.8)", transformOrigin: "0 0"}} />
                                </Box>
                            </Grid>
                        </Grid>




                        <Button variant="contained" sx={{ margin: "20px auto", width: "100%", color: "#FFFFFF" }}>
                            Sign up
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {document.addEventListener('DOMContentLoaded', function () { window.setTimeout(document.querySelector('svg').classList.add('animated'), 1000); })}
        </>
    );
}

export default SignUp;
