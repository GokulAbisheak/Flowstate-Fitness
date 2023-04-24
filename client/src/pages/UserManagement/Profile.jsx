import { Box, Button, Grid, IconButton, useTheme, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import '../../styles/index.css'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ContentBox from '../../components/ContentBox.js'
import QRCode from 'qrcode'
import FlexBetween from '../../components/FlexBetween';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const theme = useTheme();

    const loggedUser = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)

    const navigate = useNavigate();

    useEffect(() => {

        if (!loggedUser || !token) {
            navigate('/login')
        } else if (loggedUser.type != 'user') {
            console.log(loggedUser.type)
            navigate('/')
        }

    }, [])

    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')
    const [user, setUser] = useState([]);

    const [id, setId] = useState('');
    const [qr, setQr] = useState('');

    const [display, setDisplay] = useState('none');



    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    useEffect(() => {
        const getUser = () => {
            axios.get('http://localhost:8090/user/' + loggedUser.email).then((res) => {
                setUser(res.data);
            }).catch((err) => {
                alert('Unable to get user ' + err.message);
            })
        }
        getUser();
    }, [])

    const uploadImage = async (event) => {

        event.preventDefault()

        const file = event.target.files[0];
        const base64 = await convertBase64(file)
        setLoading(true);
        console.log(base64)
        axios.post("http://localhost:8090/uploadImage", { image: base64 }).then((res) => {
            setUrl(res.data);
            axios.patch(`http://localhost:8090/user/update/${loggedUser.email}`, { url: res.data })
            alert("Image uploaded Succesfully");
            window.location.reload()
        }).then(() => setLoading(false))
            .catch(console.log);
    }

    const formatDate = (date) => {
        if (date != undefined) {
            return (date.substring(0, 10));
        }
    };

    const userDetails = [
        {
            label: "First Name",
            value: user.firstName,

        },

        {
            label: "Last Name",
            value: user.lastName,

        },

        {
            label: "Email",
            value: user.email,

        },

        {
            label: "Date of Birth",
            value: formatDate(user.dateOfBirth),

        },

        {
            label: "Phone Number",
            value: user.phoneNumber,

        },

        {
            label: "Flow Tokens",
            value: user.flowTokens,

        },

        {
            label: "Height",
            value: user.height,

        },

        {
            label: "Weight",
            value: user.weight,

        },
    ]

    let tempId;

    useEffect(() => {
        axios.get(`http://localhost:8090/membership/email/${loggedUser.email}`)
            .then((res) => {

                setId(res.data._id)
                tempId = res.data._id
                console.log(res.data._id)
                generateQRCode()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const generateQRCode = () => {
        QRCode.toDataURL(tempId, {
            width: 200,
            margin: 2,
            color: {
                dark: theme.palette.primary.main,
                light: theme.palette.background.alt
            }
        }, (err, url) => {

            console.log(url)
            setQr(url)
            setDisplay('block')
        })
    }


    return (
        <>
            <Grid container spacing={2} padding={2}>
                <Grid item xs={12} >
                    <ContentBox sx={{ backgroundColor: theme.palette.background.alt }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={4} align="center">
                                <h1 style={{ color: theme.palette.primary.main }}>{user.firstName + ' ' + user.lastName}</h1>
                            </Grid>
                            <Grid item xs={8} align="center">

                            </Grid>
                            <Grid item xs={12} md={4} minWidth="280px" align="center">
                                <Box className="profile-pic" sx={{ overflow: 'hidden' }}>
                                    <img src={user.url} style={{ width: '200px', height: 'auto' }}></img>
                                </Box>
                                <Button sx={{ margin: "20px 0px" }} variant="outlined" aria-label="upload picture" component="label" startIcon={<PhotoCameraIcon />}>
                                    Change Profile Picture
                                    <input onChange={uploadImage} hidden accept="image/*" type="file" />
                                </Button>
                            </Grid>
                            <Grid item align="center" xs={12} md={8}>
                                <Grid container spacing={0}>
                                    {userDetails.map(item => (
                                        <Grid item xs={12} sm={6} md={6} lg={4} align="center">
                                            <TextField
                                                fullWidth
                                                label={item.label}
                                                variant='standard'
                                                margin="normal"
                                                value={item.value}
                                                InputProps={{
                                                    readOnly: true,
                                                    shrink: false,
                                                    disableUnderline: true
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                    {/* <Grid item xs={12} sm={6} align="center">
                                        <TextField
                                            label="Email"
                                            variant='standard'
                                            margin="normal"
                                            value={user.email}
                                            InputProps={{
                                                readOnly: true,
                                                shrink: false,
                                                disableUnderline: true
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} align="center">
                                        <TextField
                                            label="Phone Number"
                                            variant='standard'
                                            margin="normal"
                                            value={user.phoneNumber}
                                            InputProps={{
                                                readOnly: true,
                                                shrink: false,
                                                disableUnderline: true
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6} align="center">
                                        <TextField
                                            label="Date of Birth"
                                            variant='standard'
                                            margin="normal"
                                            value={formatDate(user.dateOfBirth)}
                                            InputProps={{
                                                readOnly: true,
                                                shrink: false,
                                                disableUnderline: true
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </ContentBox>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: display }}>
                    <ContentBox backgroundColor={theme.palette.background.alt} sx={{ textAlign: 'center' }}>
                        <h4>Membership QR Code</h4>
                        <a href={qr} download="Membership QR Code"><img src={qr} /></a>
                        <br />
                        Click the QR Code to Download
                    </ContentBox>
                </Grid>
                <Grid item xs={12} sm={6} md={8} lg={9}>
                    <ContentBox backgroundColor={theme.palette.background.alt} sx={{ textAlign: 'center' }}>

                    </ContentBox>
                </Grid>
            </Grid >
        </>
    );
}

export default Profile;
