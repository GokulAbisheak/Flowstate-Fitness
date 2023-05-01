import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Box, useTheme, IconButton, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';
import FlowTokenIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useSelector } from 'react-redux';
import UpdateBox from '../../components/UpdateBox.js';
import CancelIcon from '@mui/icons-material/Close';
import axios from 'axios'

const PurchaseMembership = () => {

    const loggedUser = useSelector((state) => state.user)

    const theme = useTheme();
    const [memberEmail, setMembershipEmail] = useState(loggedUser.email)
    const [membershipType, setMembershipType] = useState('');
    const [flowToken, setFlowToken] = useState();
    const [freeFlowToken, setFreeFlowToken] = useState();
    const [membershipExpiration, setMemebershipExpiration] = useState('');

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const listItem = [
        {
            title: 'Bronze',
            description1: '01 Month Membership',
            description2: 'Exclusive Access to all Membership Features',
            price: '3000 LKR',
            tokenprice: '1000',
            imgurl: '/assets/bronze.jpg',
            flowtokens: 0
        },

        {
            title: 'Silver',
            description1: '06 Month Membership',
            description2: 'Exclusive Access to all Membership Features',
            price: '15000 LKR',
            tokenprice: '5000',
            imgurl: '/assets/silver.jpg',
            flowtokens: 400
        },

        {
            title: 'Gold',
            description1: '12 Month Membership',
            description2: 'Exclusive Access to all Membership Features',
            price: '25000 LKR',
            tokenprice: '8000',
            imgurl: '/assets/gold.jpeg',
            flowtokens: 1000
        }
    ]

    const getPurchaseMembership = (type) => {

        const today = new Date();

        function addMonths(date, months) {
            date.setMonth(date.getMonth() + months);

            return (((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear())
        }

        if (type === 'Gold') {
            setMembershipType('Gold')
            setFlowToken(8000)
            setMemebershipExpiration(addMonths(today, 12))
            setFreeFlowToken(1000)
        } else if (type === 'Silver') {
            setMembershipType('Silver')
            setFlowToken(5000)
            setMemebershipExpiration(addMonths(today, 6))
            setFreeFlowToken(400)
        } else if (type === 'Bronze') {
            setMembershipType('Bronze')
            setFlowToken(1000)
            setMemebershipExpiration(addMonths(today, 1))
            setFreeFlowToken(0)
        }
        displayPurchaseBox()
    }

    const displayPurchaseBox = () => {
        document.getElementById('update-box').style.display = "block";
    }

    const hidePurchaseBox = () => {
        document.getElementById('update-box').style.display = "none";
    }

    const purchaseWithFlowToken = () => {
        console.log(loggedUser.email)

        let availableFlowTokens

        axios.get(`http://localhost:8090/user/${loggedUser.email}`).then((res) => {
            availableFlowTokens = res.data.flowTokens
            if (availableFlowTokens >= flowToken) {
                let newFlowTokens = availableFlowTokens - flowToken + freeFlowToken
                axios.patch(`http://localhost:8090/user/update/${loggedUser.email}`, { flowTokens: newFlowTokens }).then((res) => {
                    axios.get(`http://localhost:8090/membership/email/${loggedUser.email}`).then((res) => {
                        const tempId = res.data._id;
                        axios.patch(`http://localhost:8090/membership/update/${tempId}`, { expirationDate: membershipExpiration }).then((res) => {
                            handleOpenSuccess();

                            //email

                            // var emailParams = {
                            //     user_email: loggedUser.email,
                            //     user_name: loggedUser.firstName + ' ' + loggedUser.lastName,
                            //     membership_type: membershipType
                            // };

                            // emailjs.send('service_3rng3bo', 'template_pb4x2kw', emailParams, 'hYoftRZFX-bY9Hc6n')
                            //     .then(function (response) {
                            //         console.log("Email sent successfully:", response);
                            //     }, function (error) {
                            //         console.log("Email failed to send:", error);
                            //     });
                        })
                    }).catch(() => {
                        console.log(memberEmail)
                        console.log(membershipType)
                        console.log(membershipExpiration)

                        const newMembership = {
                            email: memberEmail,
                            membershipType: membershipType,
                            expirationDate: membershipExpiration
                        }

                        axios.post('http://localhost:8090/membership/add', newMembership).then((res) => {
                            handleOpenSuccess();
                        }).catch(() => {

                        })
                    })
                })
            } else {
                handleOpenError();
            }
        })
    }

    const handleOpenSuccess = () => {
        setOpenSuccess(true);
    }

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    }

    const handleOpenError = () => {
        setOpenError(true);
    }

    const handleCloseError = () => {
        setOpenError(false);
    }

    return (
        <>
            <Grid container spacing={2} alignItems="center"
                justifyContent="center"
                style={{ minHeight: 'calc(100vh - 64px)' }}>

                {listItem.map(listDetail => (
                    <Grid item xs={12} lg={4}>
                        <Card sx={{ maxWidth: "350px", margin: "20px auto" }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={listDetail.imgurl}
                                alt={listDetail.title + " Logo"}
                            />
                            <CardContent>
                                <Typography align='center' fontWeight='500' textTransform='uppercase' gutterBottom variant="h4" component="div">
                                    {listDetail.title}
                                </Typography>

                                <Typography align='center' fontWeight='700' textTransform='uppercase' gutterBottom variant="h2" component="div">
                                    {listDetail.price}
                                </Typography>

                                <Typography align='center' variant="h6">
                                    {listDetail.description1}
                                </Typography>
                                <Typography align='center' variant="body2" color="text.secondary" fontWeight={200}>
                                    {listDetail.description2}
                                </Typography>
                                <Typography align='center' variant="body2" color='#4BB543' fontWeight={500}>
                                    {listDetail.flowtokens} FlowTokens Included
                                </Typography>
                                <Box textAlign='center' marginTop={10} padding="0px 3px">
                                    <Button fullWidth variant='contained' onClick={() => {
                                        getPurchaseMembership(listDetail.title)
                                    }
                                    }>
                                        Purchase
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <UpdateBox id="update-box">
                <Box maxWidth="500px" sx={{ backgroundColor: theme.palette.background.alt, position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0px 0px 10px rgba(0,0,0,0.5)", borderRadius: "5px", padding: '20px' }}>
                    <IconButton sx={{ float: "right" }}>
                        <CancelIcon onClick={() => { hidePurchaseBox() }} />
                    </IconButton>
                    <Button variant='contained' fullWidth sx={{ marginTop: '10px' }} onClick={() => { purchaseWithFlowToken() }}>Purchase with {flowToken} FlowTokens</Button>
                    <Button variant='contained' fullWidth sx={{ marginTop: '10px' }}>Purchase with Credit/Debit Card</Button>
                </Box>
            </UpdateBox>

            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Purchase Success!
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Purchase Failed! Not enough FlowTokens
                </Alert>
            </Snackbar>
        </>
    );
}

export default PurchaseMembership;
