import { Alert, AlertTitle, Box, Button, Snackbar, TextField, useTheme } from '@mui/material';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import ErrorBox from '../../components/ErrorBox.js';

const ForgetPassword = () => {

    const form = useRef();
    const theme = useTheme();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [genOTP, setGenOTP] = useState();
    const [OTP, setOTP] = useState();
    const [displayEmail, setDisplayEmail] = useState('block');
    const [displaySend, setDisplaySend] = useState('none');
    const [displayOTP, setDisplayOTP] = useState('none');
    const [displayPassword, setDisplayPassword] = useState('none');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false)

    const generateOTP = () => {
        return Math.floor(Math.random() * 899999) + 100000;
    }

    const sendEmail = (e) => {

        e.preventDefault();

        emailjs.sendForm('service_3rng3bo', 'template_b9rt28e', form.current, 'hYoftRZFX-bY9Hc6n')
            .then((result) => {
                console.log(result.text);
                setDisplayOTP('block')
            }, (error) => {
                console.log(error.text);
            });
    };

    const handleConfirm = (e) => {

        e.preventDefault();

        if (genOTP == OTP) {
            setDisplayOTP('none')
            setDisplayPassword('block')
            setError('')
        } else {
            setError('Incorrect OTP')
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await axios.get(`http://localhost:8090/user/${email}`).then((res) => {
            setGenOTP(Number(generateOTP()));
            setName(res.data.firstName + ' ' + res.data.lastName)
            setDisplaySend('block')
            setDisplayEmail('none')
            setError('')
        }).catch(() => {
            setError('Invalid Email')
        })
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            setError('Password should contain atleast 8 characters')
        } else if (newPassword === confirmPassword) {
            await axios.patch(`http://localhost:8090/user/changepassword/${email}`, { password: newPassword }).then((res) => {
                handleOpen();
                setError('')
            }).catch((err) => {
                alert('Failed')
            })
        } else {
            setError('Passwords do not match')
        }
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        navigate('/login')
    }

    return (
        <>
            <Box className='center-box-400' sx={{ backgroundColor: theme.palette.background.alt, display: displayEmail }}>
                <form onSubmit={handleSubmit}>
                    <TextField required fullWidth type='email' placeholder='Email' onChange={(e) => {
                        setEmail(e.target.value)
                    }} />

                    <Button fullWidth variant='contained' type='submit'>
                        Reset
                    </Button>
                </form>
                <ErrorBox sx={{ display: error ? 'block' : 'none' }}>
                    {error}
                </ErrorBox>
            </Box>

            <Box className='center-box-400' sx={{ backgroundColor: theme.palette.background.alt, display: displaySend }}>
                <form ref={form} onSubmit={sendEmail} >
                    <input hidden type="text" name="user_name" value={name} />
                    <input hidden type="text" name="user_otp" value={genOTP} />
                    <input hidden type="email" name="user_email" value={email} />
                    <Button fullWidth variant='contained' type='submit'>
                        Send OTP to Email
                    </Button>
                </form>
            </Box>

            <Box align='center' className='center-box-400' sx={{ backgroundColor: theme.palette.background.alt, display: displayOTP }}>
                <form onSubmit={handleConfirm}>
                    <TextField required fullWidth type='text' placeholder='Enter OTP sent to your email' onChange={(e) => {
                        setOTP(e.target.value)
                    }} />

                    <Button fullWidth variant='contained' type='submit'>
                        Confirm
                    </Button>
                </form>
                <ErrorBox sx={{ display: error ? 'block' : 'none' }}>
                    {error}
                </ErrorBox>
            </Box>

            <Box className='center-box-400' sx={{ backgroundColor: theme.palette.background.alt, display: displayPassword }}>
                <form onSubmit={handleChangePassword}>
                    <TextField required fullWidth type='password' placeholder='Enter New Password' onChange={(e) => {
                        setNewPassword(e.target.value)
                    }} />
                    <TextField required fullWidth type='password' placeholder='Confirm New Password' onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }} />
                    <Button fullWidth variant='contained' type='submit'>
                        Change Password
                    </Button>
                </form>
                <ErrorBox sx={{ display: error ? 'block' : 'none' }}>
                    {error}
                </ErrorBox>
            </Box>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Password Changed Successfully
                </Alert>
            </Snackbar>
        </>
    );
}

export default ForgetPassword;
