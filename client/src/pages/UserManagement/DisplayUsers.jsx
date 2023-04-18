import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Box, Button, IconButton, Input, Snackbar, TextField, useTheme } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Close';
import '../../styles/index.css'
import { useSelector } from 'react-redux';

const DisplayUsers = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [open, setOpen] = useState(false);

    const theme = useTheme();

    const loggedUser = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)

    useEffect(() => {
        const getAllUsers = () => {
            axios.get('http://localhost:8090/user').then((res) => {
                setAllUsers(res.data);
            }).catch((err) => {
                alert('Unable to get all users ' + err.message);
            })
        }
        getAllUsers();
    }, [])

    const deleteUser = (email) => {
        axios.delete(`http://localhost:8090/user/delete/${email}`).then(() => {
            alert('User deleted successfully');
            location.reload();
        }).catch((err) => {
            alert('User delete unsuccessful ' + err.message);
        })
    }

    const getUser = (email) => {
        axios.get(`http://localhost:8090/user/${email}`).then((res) => {
            setFName(res.data.firstName);
            setLName(res.data.lastName);
            setEmail(res.data.email);
            setDateOfBirth(res.data.dateOfBirth);
            setPhoneNumber(res.data.phoneNumber);
            setOldEmail(res.data.email);
        }).catch((err) => {
            alert('Unable to get user ' + err.message);
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
        setFName('');
        setLName('');
        setEmail('');
        setDateOfBirth('');
        setPhoneNumber('');
        setOldEmail('');
    }

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
            phoneNumber: phoneNumber
        }

        await axios.patch(`http://localhost:8090/user/update/${oldEmail}`, updateDetails).then(() => {
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
                            <TableCell sx={{ color: '#FFFFFF' }}>Email</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>First Name</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Last Name</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Date of Birth</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Phone Number</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers.map((user) => (
                            <TableRow
                                key={user.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.email}
                                </TableCell>
                                <TableCell align="center">{user.firstName}</TableCell>
                                <TableCell align="center">{user.lastName}</TableCell>
                                <TableCell align="center">{formatDate(user.dateOfBirth)}
                                </TableCell>
                                <TableCell align="center">{user.phoneNumber}</TableCell>
                                <TableCell align="center">
                                    <Button variant='contained' color='success' sx={{ margin: '5px', color: '#FFFFFF' }} onClick={() => {
                                        getUser(user.email);
                                        displayUpdateForm();
                                    }}>Update</Button>
                                    <Button variant='contained' color='error' sx={{ margin: '5px' }} onClick={() => { deleteUser(user.email) }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box id="update-box" sx={{ backgroundColor: "rgba(0,0,0,0.3)", width: "100%", height: "100%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <Box maxWidth="500px" height="520px" sx={{ backgroundColor: theme.palette.background.alt, position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0px 0px 10px rgba(0,0,0,0.5)", borderRadius: "5px" }}>
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

                        <Button type="submit" color="success" variant='contained' sx={{ margin: "10px 40px", width: "calc(100% - 80px)" }}>
                            Confirm Update
                        </Button>
                    </form>
                </Box>
            </Box>

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
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

export default DisplayUsers;
