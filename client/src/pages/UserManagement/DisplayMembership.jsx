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
import SearchIcon from '@mui/icons-material/Search';
import FlexBetween from '../../components/FlexBetween.js'
import { useSelector } from 'react-redux';

const DisplayMemberships = () => {

    const loggedUser = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const [allMemberships, setAllMemberships] = useState([]);
    const [membershipType, setMembershipType] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [membershipEmail, setMembershipEmail] = useState("");
    const [memberId, setMemberId] = useState("");
    const [open, setOpen] = useState(false);

    //search
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMemberships, setSearchMemberships] = useState([]);
    const [noResult, setNoResult] = useState('');
    const [display, setDisplay] = useState('none');

    //sort
    const [sortTerm, setSortTerm] = useState('');
    const [sortMemberships, setSortMemberships] = useState([]);
    const [sortDisplay, setSortDisplay] = useState('none');

    //display main
    const [mainDisplay, setMainDisplay] = useState('block');


    const theme = useTheme();

    const StyledTextField = styled(TextField)({
        width: "calc(100% - 80px)",
        margin: "10px 40px"
    })

    useEffect(() => {
        const getAllMemberships = () => {
            axios.get('http://localhost:8090/membership', config).then((res) => {
                setAllMemberships(res.data);
            }).catch((err) => {
                alert('Unable to get all memberships ' + err.message);
            })
        }
        getAllMemberships();
    }, [])

    const deleteMembership = (memberId) => {
        axios.delete(`http://localhost:8090/membership/delete/${memberId}`, config).then(() => {
            alert('Membership deleted successfully');
            location.reload();
        }).catch((err) => {
            alert('Membership delete unsuccessful ' + err.message);
        })
    }

    const getMembership = (memberId) => {
        axios.get(`http://localhost:8090/membership/${memberId}`, config).then((res) => {
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

        await axios.patch(`http://localhost:8090/membership/update/${memberId}`, updateDetails, config).then(() => {
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

    //search
    const handleSearch = async () => {
        if (searchTerm != '') {
            axios.get(`http://localhost:8090/membership/search/byemail?term=${searchTerm}`, config).then((res) => {
                setSearchMemberships(res.data);
                if (res.data.length === 0) {
                    setNoResult('No results')
                    setDisplay('none')
                } else {
                    setNoResult('')
                    setDisplay('block');
                }
                setSortDisplay('none')
                setMainDisplay('none');
            }).catch((err) => {
                console.log(err)
            })
        }
    };

    //sort
    const handleSort = async (term) => {
        console.log('test 1')
        if (term != '') {
            console.log('test 2')
            axios.get(`http://localhost:8090/membership/sort/${term}`, config).then((res) => {

                setSortMemberships(res.data);
                if (res.data.length === 0) {
                    setNoResult('No results')
                    setSortDisplay('none')
                    setMainDisplay('block');
                    setDisplay('none')
                } else {
                    setNoResult('')
                    setSortDisplay('block');
                    setMainDisplay('none');
                    setDisplay('none')
                }

            }).catch((err) => {
                console.log(err)
            })
        }
    };

    //available membership types
    const availableTypes = [
        {
            value: '',
            disable: true
        },

        {
            value: 'Gold',
            disable: false
        },

        {
            value: 'Silver',
            disable: false
        },

        {
            value: 'Bronze',
            disable: false
        }
    ]

    //sort
    const sortNow = (e) => {
        setSortTerm(e.target.value)
        handleSort(e.target.value);
    }

    return (
        <>
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
                <FlexBetween>
                    <TextField
                        select
                        label="Select Membership Type"
                        defaultValue=""
                        onChange={sortNow}
                        SelectProps={{
                            native: true,
                        }}
                        variant="standard"
                        sx={{ width: '250px' }}
                    >
                        {availableTypes.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.disable}>
                                {option.value}
                            </option>
                        ))}
                    </TextField>
                </FlexBetween>
            </FlexBetween>



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
                        {searchMemberships.map(membership => (
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

            <TableContainer component={Paper} sx={{ margin: '20px 0px', display: sortDisplay }}>
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
                        {sortMemberships.map(membership => (
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

            <TableContainer component={Paper} sx={{ display: mainDisplay }}>
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
