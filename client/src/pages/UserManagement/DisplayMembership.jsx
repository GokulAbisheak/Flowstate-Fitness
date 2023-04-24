import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, IconButton, Input, Snackbar, TextField, styled, useTheme, Alert } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Close';
import '../../styles/index.css'
import UpdateBox from '../../components/UpdateBox.js';
import UpdateBoxContent from '../../components/UpdateBoxContent.js';

const DisplayMemberships = () => {

    const [allMemberships, setAllMemberships] = useState([]);
    const [membershipType, setMembershipType] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [membershipEmail, setMembershipEmail] = useState("");
    const [memberId, setMemberId] = useState("");
    const [open, setOpen] = useState(false);

    const theme = useTheme();

    const StyledTextField = styled(TextField)({
        width: "calc(100% - 80px)",
        margin: "10px 40px"
    })

    useEffect(() => {
        const getAllMemberships = () => {
            axios.get('http://localhost:8090/membership').then((res) => {
                setAllMemberships(res.data);
            }).catch((err) => {
                alert('Unable to get all memberships ' + err.message);
            })
        }
        getAllMemberships();
    }, [])

    const deleteMembership = (memberId) => {
        axios.delete(`http://localhost:8090/membership/delete/${memberId}`).then(() => {
            alert('Membership deleted successfully');
            location.reload();
        }).catch((err) => {
            alert('Membership delete unsuccessful ' + err.message);
        })
    }

    const getMembership = (memberId) => {
        axios.get(`http://localhost:8090/membership/${memberId}`).then((res) => {
            setMembershipType(res.data.membershipType);
            setExpirationDate(res.data.expirationDate);
            setMemberId(res.data._id);
            setMembershipEmail(res.data.email);
        }).catch((err) => {
            alert('Unable to get membership ' + err.message);
        })
    }

    const formatDate = (date) => {
        return (date.substring(0, 10));
    };

    const displayUpdateForm = () => {
        document.getElementById('update-box').style.display = "block";
    }

    const hideUpdateForm = () => {
        document.getElementById('update-box').style.display = "none";
        setMembershipType('');
        setExpirationDate('');
        setMemberId('');
        setMembershipEmail('');
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const updateDetails = {
            membershipType: membershipType,
            expirationDate: expirationDate,
            membershipEmail: membershipEmail
        }

        await axios.patch(`http://localhost:8090/membership/update/${memberId}`, updateDetails).then(() => {
            handleOpen();
            hideUpdateForm();

        }).catch((err) => {
            alert('Update Failed ' + err.message);
        })

    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        location.reload();
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                    <TableHead sx={{ background: 'linear-gradient(to left, #07a7af, #01519a)' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#FFFFFF' }}>Membership Id</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Member Email</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Membership Type</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Expiration Date</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allMemberships.map((membership) => (
                            <TableRow
                                key={membership._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {membership._id}
                                </TableCell>
                                <TableCell align="center">{membership.email}</TableCell>
                                <TableCell align="center">{membership.membershipType}</TableCell>
                                <TableCell align="center" sx={{ color: (new Date(membership.expirationDate)) > (new Date()) ? "#4BB543" : "#FF0000", fontWeight: "500" }}>{formatDate(membership.expirationDate)}
                                </TableCell>

                                <TableCell align="center">
                                    <Button variant='contained' color='success' sx={{ margin: '5px', color: '#FFFFFF' }} onClick={() => {
                                        getMembership(membership._id);
                                        displayUpdateForm();
                                    }}>Update</Button>
                                    <Button variant='contained' color='error' sx={{ margin: '5px' }} onClick={() => { deleteMembership(membership._id) }}>Cancel</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateBox id="update-box" >
                <UpdateBoxContent backgroundColor={theme.palette.background.alt}>
                    <IconButton sx={{ float: "right", margin: "5px" }}>
                        <CancelIcon onClick={() => { hideUpdateForm() }} />
                    </IconButton>
                    { }
                    <form onSubmit={handleSubmit}>
                        <StyledTextField
                            label="Member ID"
                            value={memberId}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setMemberId(e.target.value);
                            }} disabled />

                        <StyledTextField
                            label="Member Email"
                            value={membershipEmail}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setMembershipEmail(e.target.value);
                            }} disabled />

                        <StyledTextField
                            label="Membership Type"
                            value={membershipType}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setMembershipType(e.target.value);
                            }} disabled />

                        <StyledTextField
                            type="date"
                            label="Expiration Date"
                            value={expirationDate.substring(0, 10)}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setExpirationDate(e.target.value);
                            }} />

                        <Button type="submit" color="success" variant='contained' sx={{ margin: "10px 40px", width: "calc(100% - 80px)" }}>
                            Confirm Update
                        </Button>
                    </form>
                </UpdateBoxContent>
            </UpdateBox>
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

export default DisplayMemberships;
