import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Box, Button, Grid, Link, TextField, useTheme } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../state';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch()

    const handleLoginSubmit = (e) => {

        e.preventDefault();

        const user = {
            email: email,
            password: password,
        }

        axios.post('http://localhost:8090/user/login', user).then((res) => {
        
            const user = res.data.user
            const token = res.data.token 
            console.log(user)
            dispatch(setCredentials({user, token}))

            alert('Login Successful!')
            navigate('/admin/users')

        }).catch((err) => {
            alert('Invalid Credentials')
        })
    }

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

                        <form onSubmit={handleLoginSubmit}>

                            <TextField
                                label="Email"
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    marginBottom: "10px"
                                }}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }
                                }
                            />

                            <TextField
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                sx={{
                                    width: "100%",
                                    marginBottom: "10px"
                                }}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }
                                }
                            />

                            <Button type="submit" variant="contained" sx={{ margin: "20px auto", width: "100%", color: "#FFFFFF" }}>
                                login
                            </Button>
                        </form>
                        <Link href="#" underline="hover">
                            Forgot Password?
                        </Link>
                    </Box>
                </Grid>
            </Grid>
            {document.addEventListener('DOMContentLoaded', function () { window.setTimeout(document.querySelector('svg').classList.add('animated'), 1000); })}
        </>
    );
}

export default Login;
