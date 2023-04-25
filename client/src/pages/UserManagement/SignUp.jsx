import { Box, Button, Grid, Link, TextField, useTheme } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import FlexBetween from '../../components/FlexBetween';
import InputField from '../../components/InputField';
import ReCAPTCHA from 'react-google-recaptcha';
import '../../styles/index.css';
import axios from 'axios';
import emailjs from '@emailjs/browser';

const SignUp = () => {

    const form = useRef();

    const sendEmail = () => {

        emailjs.sendForm('service_3rng3bo', 'template_pb4x2kw', form.current, 'hYoftRZFX-bY9Hc6n')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [errors, setErrors] = useState({});
    const [human, setHuman] = useState(false);

    const theme = useTheme();
    const navigate = useNavigate()

    //validation
    const validateInputs = () => {
        let errors = {};

        // Validate first name
        if (!fName.trim()) {
            errors.fName = 'First name is required';
        }

        // Validate last name
        if (!lName.trim()) {
            errors.lName = 'Last name is required';
        }

        // Validate email
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Email is invalid';
        }

        // Validate password
        const passwordRegex = /.{8,}/;
        if (!password) {
            errors.password = 'Password is required';
        } else if (!passwordRegex.test(password)) {
            errors.password = 'Password must be at least 8 characters';
        }

        //validate confirm password
        if (!confirmPassword) {
            errors.confirmPassword = 'Confirming password is required';
        } else if (password != confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        //validate date of birth
        if (!dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        }

        //validate phone number
        const phoneRegex = /^[0-9]{10,}$/;
        if (!phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(phoneNumber)) {
            errors.phoneNumber = 'Phone number must contain only numbers and be at least 10'
        }

        if (!human) {
            errors.human = 'Verify you are a human';
        }

        return errors;
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        // Check for validation errors
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log("Have Errors");
            return;
        }

        // Create new user object
        const newUser = {
            firstName: fName,
            lastName: lName,
            email: email,
            password: password,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
            type: 'user'
        };

        // Add new user to parent component state
        axios.post('http://localhost:8090/user/add', newUser).then(() => {
            sendEmail();
            navigate('/login')

            // Reset form inputs
            setFName('');
            setLName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setDateOfBirth('');
            setPhoneNumber('');
            setErrors({});
            setHuman(false);

        }).catch((err) => {

            setErrors({email: 'Email already exists'})
        })
    };


    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={6} display="flex" justifyContent="center" alignItems="center" minHeight="90vh" sx={{ display: { xs: "none", lg: "flex" } }}>
                    <img style={{ width: "80%", height: "auto" }} src="/assets/pilates-animate.svg" />
                </Grid>
                <Grid item xs={12} lg={6} display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
                    <form onSubmit={handleSubmit}>
                        <Box backgroundColor={theme.palette.background.alt}
                            margin="0px auto"
                            width="100%"
                            boxShadow="0px 0px 10px rgba(0,0,0,0.3)"
                            borderRadius="10px"
                            padding="20px"
                            textAlign="center"
                            sx={{ maxWidth: { xs: "100%", sm: "600px" }, backgroundColor: { xs: "transarent", md: theme.palette.background.alt }, boxShadow: { xs: "none", md: "0px 0px 10px rgba(0,0,0,0.3)" } }}>

                            <img src={
                                theme.palette.mode === 'dark'
                                    ? '/assets/semi-white.png'
                                    : '/assets/semi-black.png'
                            } style={{ width: "150px", margin: "10px" }} />

                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <InputField
                                        label="First Name"
                                        variant="outlined"
                                        onChange={(e) => {
                                            setFName(e.target.value)
                                        }}
                                        error={Boolean(errors.fName)}
                                        helperText={errors.fName}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputField
                                        label="Last Name"
                                        variant="outlined"
                                        onChange={(e) => {
                                            setLName(e.target.value)
                                        }}
                                        error={Boolean(errors.lName)}
                                        helperText={errors.lName}

                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <InputField
                                        label="Email"
                                        variant="outlined"
                                        onChange={(e) => {
                                            setEmail(e.target.value)
                                        }}
                                        error={Boolean(errors.email)}
                                        helperText={errors.email}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputField
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        error={Boolean(errors.password)}
                                        helperText={errors.password}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputField
                                        label="Confirm Password"
                                        variant="outlined"
                                        type="password"
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                        }}
                                        error={Boolean(errors.confirmPassword)}
                                        helperText={errors.confirmPassword}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputField
                                        label="Date of Birth"
                                        variant='outlined'
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => {
                                            setDateOfBirth(e.target.value)
                                        }}
                                        error={Boolean(errors.dateOfBirth)}
                                        helperText={errors.dateOfBirth}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <InputField
                                        label="Phone Number"
                                        variant='outlined'
                                        onChange={(e) => {
                                            setPhoneNumber(e.target.value)
                                        }}
                                        error={Boolean(errors.phoneNumber)}
                                        helperText={errors.phoneNumber}
                                    />
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <Box width="250px" margin="0px auto">
                                        <ReCAPTCHA
                                            sitekey="6Ld2reYkAAAAAD_zwIfgTotQoccN8SpSunomkCUn"
                                            theme={theme.palette.mode}
                                            onChange={(e) => {
                                                setHuman(true);
                                            }}
                                            style={{ transform: "scale(0.8)", transformOrigin: "0 0" }}
                                        />
                                        {errors.human && <span className="error">{errors.human}</span>}
                                    </Box>
                                </Grid>
                            </Grid>

                            <Button type="submit" variant="contained" sx={{ margin: "20px auto", width: "100%", color: "#FFFFFF" }}>
                                Sign up
                            </Button>
                        </Box>
                    </form>
                </Grid>
            </Grid>

            <form ref={form} onSubmit={sendEmail} hidden>
                <label>Name</label>
                <input type="text" name="user_name" value={fName + ' ' + lName} />
                <label>Email</label>
                <input type="email" name="user_email" value={email} />
                <input type="submit" value="Send" />
            </form>

            {document.addEventListener('DOMContentLoaded', function () { window.setTimeout(document.querySelector('svg').classList.add('animated'), 1000); })}
        </>
    );
}

export default SignUp;
