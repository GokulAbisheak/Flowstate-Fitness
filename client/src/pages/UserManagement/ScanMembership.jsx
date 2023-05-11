import { Alert, Box, Grid, Snackbar, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QrCodeScanner } from "react-simple-qr-code-scanner";
import axios from 'axios';
import { useTheme } from '@mui/material'
import '../../styles/index.css'
import { useSelector } from 'react-redux';

const ScanMembership = () => {

    const loggedUser = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const [scannedResult, setScannedResult] = useState('');
    const [membershipId, setMemebershipId] = useState('');
    const [memberEmail, setMemeberEmail] = useState('');
    const [membershipExpiration, setMemebershipExpiration] = useState('');
    const [membershipType, setMemebershipType] = useState('');
    const [invalid, setInvalid] = useState('');
    const [access, setAccess] = useState('');
    const [open, setOpen] = useState(false);

    const theme = useTheme();

    let prevID;

    useEffect(() => {

    })

    const executeScan = (result) => {
        if (result != null && result.text != prevID) {
            prevID = result.text;
            console.log(result)
            setScannedResult(result.text);

            axios.get(`http://localhost:8090/membership/${result.text}`, config).then((res) => {
                if (res.data._id != undefined) {
                    setMemebershipId(res.data._id)
                    setMemeberEmail(res.data.email)
                    setMemebershipExpiration(res.data.expirationDate)
                    setMemebershipType(res.data.membershipType)
                    setInvalid('')

                    if ((new Date(res.data.expirationDate)) > (new Date())) {
                        setAccess('Access Granted')
                    } else {
                        setAccess('Access Denied')
                        setInvalid('Membership Expired')
                    }

                } else {
                    setInvalid('Invalid Membership QR Code')
                    setAccess('Access Denied')
                    setMemebershipId('')
                    setMemeberEmail('')
                    setMemebershipExpiration('')
                    setMemebershipType('')
                }
            }).catch((err) => {
                setInvalid('Invalid Membership QR Code')
                setAccess('Access Denied')
                setMemebershipId('')
                setMemeberEmail('')
                setMemebershipExpiration('')
                setMemebershipType('')
            })
        }
        handleOpen();
    }

    const formatDate = (date) => {
        return (date.substring(0, 10));
    };

    const scanError = (err) => {
        console.log(err);
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Grid container spacing={0} align="center">
                <Grid item xs={6} xl={6}>
                    <QrCodeScanner
                        onResult={executeScan}
                        Errors={scanError}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box position="relative" sx={{ backgroundColor: theme.palette.background.alt }} className="scanner-display">
                        <h1 style={{ color: (access === 'Access Granted') ? '#4BB543' : '#FF0000' }}>{access}</h1>
                        <h3 style={{ color: '#FF0000' }}>{invalid}</h3>
                        <Box align='left' sx={{ display: (membershipId != '') ? 'block' : 'none' }} >
                            {/* <h4> Membership ID - {membershipId} </h4>
                            <h4> Member Email - {memberEmail} </h4>
                            <h4> Membership Expiration Date - {formatDate(membershipExpiration)} </h4>
                            <h4> Membership Type - {membershipType} </h4> */}
                            <Stack spacing={3}>
                                <TextField fullWidth label="Membership ID" value={membershipId}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ readOnly: true }} />

                                <TextField fullWidth label="Member Email" value={memberEmail}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ readOnly: true }} />

                                <TextField fullWidth label="Membership Expiration Date" value={formatDate(membershipExpiration)}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ readOnly: true }} />

                                <TextField fullWidth label="Membership Type" value={membershipType}
                                    InputLabelProps={{ shrink: true }}
                                    InputProps={{ readOnly: true }} />
                            </Stack>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Alert variant="filled" onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    Scannned Success
                </Alert>
            </Snackbar>
        </>
    );
}

export default ScanMembership;
