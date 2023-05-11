import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Fab, IconButton, Input, TextField, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Close';
import '../../styles/index.css'
import {  useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FlexBetween from '../../components/FlexBetween.js'



const DisplayApplication = () => {

    const [allTrainers, setAllTrainers] = useState([]);
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    
    const theme = useTheme();


    useEffect(() => {
        const getAllTrainers = () => {
            axios.get('http://localhost:8090/trainer/applicant/get').then((res) => {
                setAllTrainers(res.data);
                
            }).catch((err) => {
                alert('Unable to get all trainers ' + err.message);
            })
        }
        getAllTrainers();
    }, [])

    const deleteTrainer = (email) => {
        axios.delete(`http://localhost:8090/trainer/applicant/delete/${email}`).then(() => {
            alert('Trainer deleted successfully');
            location.reload();
        }).catch((err) => {
            alert('Trainer delete unsuccessful ' + err.message);
        })
    }

    const getTrainer = (email) => {
        axios.get(`http://localhost:8090/trainer/applicant/get/${email}`).then((res) => {
            setFName(res.data.firstName);
            setLName(res.data.lastName);
            setEmail(res.data.email);
            setDateOfBirth(res.data.dateOfBirth);
            setPhoneNumber(res.data.phoneNumber);
            setOldEmail(res.data.email);

            axios.post('http://localhost:8090/trainer/add', res.data).then((res) => {
                    alert('Added to trainer')
                }).catch((err) => {

                })

            deleteTrainer(email);

        }).catch((err) => {
            alert('Unable to get trainer ' + err.message);
        })
    }

    const formatDate = (date) => {
        return (date.substring(0, 10));
    };

    //search
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
       setAllTrainers(filteredTrainers)
    };



    return (
        <>
            <FlexBetween>
                <FlexBetween>
                    <Button onClick={() => { window.location.reload() }}>
                        All
                    </Button>
                    <Box display="flex" alignItems="center" width="250px" padding="5px 10px" sx={{ backgroundColor: theme.palette.background.alt, borderRadius: '10px', boxShadow: '0px 0px 2px #000000' }}>
                        <TextField placeholder='Search...' variant='standard' InputProps={{
                            disableUnderline: true
                        }} type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <IconButton onClick={handleSearch} sx={{ width: "40px" }}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </FlexBetween>
            </FlexBetween>

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
                        {allTrainers.map((trainer) => (
                            <TableRow
                                key={trainer.email}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {trainer.email}
                                </TableCell>
                                <TableCell align="center">{trainer.firstName}</TableCell>
                                <TableCell align="center">{trainer.lastName}</TableCell>
                                <TableCell align="center">{formatDate(trainer.dateOfBirth)}
                                </TableCell>
                                <TableCell align="center">{trainer.phoneNumber}</TableCell>
                                <TableCell align="center">
                                    <Button variant='contained' color='success' sx={{ margin: '5px', color: '#FFFFFF' }} onClick={() => {
                                        getTrainer(trainer.email)
                                    }}>Accept</Button>
                                    <Button variant='contained' color='error' sx={{ margin: '5px' }} onClick={() => { deleteTrainer(trainer.email) }}>Reject</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </>
    );
}

export default DisplayApplication;
