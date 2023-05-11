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
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FlexBetween from '../../components/FlexBetween.js'

const DisplayUsers = () => {

    const loggedUser = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)

    const navigate = useNavigate();

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    //all users
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = () => {
            axios.get('http://localhost:8090/user', config)
                .then((res) => {
                    setAllUsers(res.data);
                })
                .catch((err) => {
                    alert('Unable to get all users ' + err.message);
                })
        }
        getAllUsers();
    }, [])

    //update users
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [open, setOpen] = useState(false);

    const getUser = (email) => {
        axios.get(`http://localhost:8090/user/${email}`)
            .then((res) => {
                setFName(res.data.firstName);
                setLName(res.data.lastName);
                setEmail(res.data.email);
                setDateOfBirth(res.data.dateOfBirth);
                setPhoneNumber(res.data.phoneNumber);
                setOldEmail(res.data.email);
            })
            .catch((err) => {
                alert('Unable to get user ' + err.message);
            })
    }


    //errors
    const [errors, setErrors] = useState({});

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

        return errors;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        // Check for validation errors
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log("Have Errors");
            return;
        }

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

        await axios.patch(`http://localhost:8090/user/update/${oldEmail}`, updateDetails, config).then(() => {
            handleOpen();
            hideUpdateForm();

        }).catch((err) => {
            alert('Update Failed ' + err.message);
        })

    }

    //theme
    const theme = useTheme();

    //delete user
    const deleteUser = (email) => {
        const del = confirm(`Confirm delete user ${email}?`);

        if(del == false) {
            return
        }

        axios.delete(`http://localhost:8090/user/delete/${email}`, config)
            .then(() => {
                alert('User deleted successfully');
                location.reload();
            })
            .catch((err) => {
                alert('User delete unsuccessful ' + err.message);
            })
    }

    //format date
    const formatDate = (date) => {
        return (date.substring(0, 10));
    };

    //display updateform
    const displayUpdateForm = () => {
        document.getElementById('update-box').style.display = "block";
    }

    //hide updateform
    const hideUpdateForm = () => {
        document.getElementById('update-box').style.display = "none";
        setFName('');
        setLName('');
        setEmail('');
        setDateOfBirth('');
        setPhoneNumber('');
        setOldEmail('');
    }

    //alert open
    const handleOpen = () => {
        setOpen(true);
    }

    //alert close
    const handleClose = () => {
        setOpen(false);
        location.reload();
    }

    const [deleteOpen, setDeleteOpen] = useState(false)

    //delete success
    //alert open
    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    }

    //alert close
    const handleDeleteClose = () => {
        setDeleteOpen(false);
        location.reload();
    }

    //search
    const [searchTerm, setSearchTerm] = useState('');
    const [searchUsers, setSearchUsers] = useState([]);
    const [noResult, setNoResult] = useState('');
    const [display, setDisplay] = useState('none');
    const [displayMain, setDisplayMain] = useState('block');

    const handleSearch = async () => {
        if (searchTerm != '') {
            axios.get(`http://localhost:8090/user/search/byemail?term=${searchTerm}`, config)
                .then((res) => {
                    setSearchUsers(res.data);

                    if (res.data.length === 0) {
                        setNoResult('No results')
                        setDisplay('none')
                    } else {
                        setNoResult('')
                        setDisplay('block');
                    }
                    setDisplayMain('none')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    };

    return (
        <>
            {/* search bar */}
            <FlexBetween>
                <FlexBetween>

                    <Box display="flex" alignItems="center" width="250px" padding="5px 10px" sx={{ backgroundColor: theme.palette.background.alt, borderRadius: '10px', boxShadow: '0px 0px 2px #000000' }}>
                        <TextField placeholder='Search...' variant='standard' InputProps={{
                            disableUnderline: true
                        }} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <IconButton onClick={handleSearch} sx={{ width: "40px" }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                    <Button onClick={() => { window.location.reload() }}>
                        Refresh
                    </Button>
                </FlexBetween>
            </FlexBetween>

            {/* search results */}
            <p align="center">{noResult}</p>
            <TableContainer component={Paper} sx={{ margin: '20px 0px', display: display }}>
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
                        {searchUsers.map(user => (
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

            {/* display all users */}
            <TableContainer component={Paper} sx={{ marginTop: '20px', display: displayMain }}>
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

            {/* update form */}
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
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                            InputLabelProps={{ shrink: true }}
                            disabled
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="First Name"
                            value={fName}
                            error={Boolean(errors.fName)}
                            helperText={errors.fName}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setFName(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="Last Name"
                            value={lName}
                            error={Boolean(errors.lName)}
                            helperText={errors.lName}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setLName(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            type="date"
                            label="Date of Birth"
                            value={dateOfBirth.substring(0, 10)}
                            error={Boolean(errors.dateOfBirth)}
                            helperText={errors.dateOfBirth}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => {
                                setDateOfBirth(e.target.value);
                            }} />

                        <TextField sx={{ width: "calc(100% - 80px)", margin: "10px 40px" }}
                            label="Phone Number"
                            value={phoneNumber}
                            error={Boolean(errors.phoneNumber)}
                            helperText={errors.phoneNumber}
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

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Update Success!
                </Alert>
            </Snackbar>

            <Snackbar open={deleteOpen} autoHideDuration={2000} onClose={handleDeleteClose} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleDeleteClose} severity="success" sx={{ width: '100%' }}>
                    Update Success!
                </Alert>
            </Snackbar>
        </>
    );
}

export default DisplayUsers;
