import { Box, Button, Grid, IconButton, useTheme, TextField, Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux';
import '../../styles/index.css'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ContentBox from '../../components/ContentBox.js'
import QRCode from 'qrcode'
import FlexBetween from '../../components/FlexBetween';
import { useNavigate } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

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

    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [flowTokens, setFlowTokens] = useState();
    const [open, setOpen] = useState(false);
    const [displayUpdate, setDisplayUpdate] = useState('none')


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
                setFName(res.data.firstName);
                setLName(res.data.lastName);
                setEmail(res.data.email);
                setOldEmail(res.data.email);
                setDateOfBirth(res.data.dateOfBirth);
                setPhoneNumber(res.data.phoneNumber);
                setHeight(res.data.height)
                setWeight(res.data.weight)
                setFlowTokens(res.data.flowTokens)
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

    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(email);
        console.log(fName);
        console.log(lName);
        console.log(dateOfBirth);
        console.log(phoneNumber);

        const updateDetails = {
            firstName: fName,
            lastName: lName,
            email: email,
            dateOfBirth: dateOfBirth,
            phoneNumber: phoneNumber,
            height: height,
            weight: weight
        }

        await axios.patch(`http://localhost:8090/user/update/${oldEmail}`, updateDetails).then(() => {
            handleOpen();
            hideUpdateForm();

        }).catch((err) => {
            alert('Update Failed ' + err.message);
        })

    }

    const userDetails = [
        {
            label: "First Name",
            value: fName,

        },

        {
            label: "Last Name",
            value: lName,

        },

        {
            label: "Email",
            value: email,

        },

        {
            label: "Date of Birth",
            value: formatDate(dateOfBirth),

        },

        {
            label: "Phone Number",
            value: phoneNumber,

        },

        {
            label: "Flow Tokens",
            value: flowTokens,

        },

        {
            label: "Height",
            value: height,

        },

        {
            label: "Weight",
            value: weight,

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

    //alert open
    const handleOpen = () => {
        setOpen(true);
    }

    //alert close
    const handleClose = () => {
        setOpen(false);
    }

    //display updateform
    const displayUpdateForm = () => {
        document.getElementById('update-box').style.display = "block";
    }

    //hide updateform
    const hideUpdateForm = () => {
        document.getElementById('update-box').style.display = "none";
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
                                                    disableUnderline: true,
                                                    style: {
                                                        fontSize: '18px'
                                                    }
                                                }}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    style: {
                                                        fontSize: '18px'
                                                    }
                                                }}
                                                sx={{ fontSize: '30px' }}
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
                        <Button sx={{ float: 'right', marginBottom: '10px' }} onClick={() => {
                            displayUpdateForm()
                        }}>Edit Details</Button>
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

            {/* Update User */}
            <Box id="update-box" sx={{ backgroundColor: "rgba(0,0,0,0.3)", width: "100%", height: "100%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex:10000 }}>
                <Box maxWidth="500px" sx={{ backgroundColor: theme.palette.background.alt, position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0px 0px 10px rgba(0,0,0,0.5)", borderRadius: "5px" }}>
                    <IconButton sx={{ float: "right", margin: "5px" }}>
                        <CancelIcon onClick={() => { hideUpdateForm() }} />
                    </IconButton>
                    { }
                    <form onSubmit={handleSubmit}>
                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="Email"
                            value={email}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="First Name"
                            value={fName}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setFName(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="Last Name"
                            value={lName}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setLName(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            type="date"
                            label="Date of Birth"
                            value={dateOfBirth.substring(0, 10)}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setDateOfBirth(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="Phone Number"
                            value={phoneNumber}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="Height"
                            value={height}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setHeight(e.target.value);
                            }}
                            type="number" />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="Weight"
                            value={weight}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setWeight(e.target.value);
                            }}
                            type="number" />

                        <Button type="submit" color="success" variant='contained' sx={{ margin: "10px 40px", width: "calc(100% - 80px)" }}>
                            Confirm Update
                        </Button>
                    </form>
                </Box>
            </Box>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Update Success!
                </Alert>
            </Snackbar>
        </>
    );
}

export default Profile;
