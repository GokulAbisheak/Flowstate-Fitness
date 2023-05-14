import React, { useState, useEffect } from 'react';
import { useTheme, Snackbar,Alert } from '@mui/material';
import { Box,Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button,FormControl, Select, MenuItem  } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CancelIcon from '@mui/icons-material/Close';
import '../../styles/index.css'
import axios from 'axios';


const DisplayAttendance = () => {
    const [allAttendance, setAllAttendance] = useState([]);
    const [name, setName] = useState("");
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredAttendance, setFilteredAttendance] = useState([]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        if (event.target.value === 'All Attendance') {
            setFilteredAttendance(allAttendance);
        } else {
            const filtered = allAttendance.filter(attendance => attendance.present === (event.target.value==='Present'));
            setFilteredAttendance(filtered);
        }
    }

    useEffect(() => {
        const getAttendance = () => {
            axios.get('http://localhost:8090/attendance').then((res) => {
                setAllAttendance(res.data);
                setName(res.data);
                setFilteredAttendance(res.data);
            }).catch((err) => {
                alert('Unable to get all Attendance ' + err.message);
            })
        }
        getAttendance();
    }, []);


    const onSubmitDeleteAttendance = async (attendance, name) => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/attendance/delete/${name}`);
            // alert('Deleting Successful!');
            // window.location.href = '/admin/attendance'
            handleOpenSuccess();
        } catch (err) {
            alert('Attendance deleting failed! ' + err)
        }
    };

    const theme = useTheme();

    const formatDate = (date) => {
        return date.substring(0, 10)
    }

    const handleOpenSuccess = () => {
        setOpenSuccess(true);
        setTimeout(() => {
            window.location.href = '/admin/attendance';
          }, 3000);
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
    const loggedInUser = useSelector((state) => state.user);
    return (
        <>
             <Grid 
                container spacing={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                direction={"column"}>
                <Grid item>
                    <Grid>
                        <FormControl variant="standard" sx={{ minWidth: 400, mt: 2, mb: 6 }}>
                            <Select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select a category' }}
                            >   <MenuItem value="" disabled>
                                Attendance
                                </MenuItem>
                                <MenuItem value="All Attendance">All Attendance</MenuItem>
                                <MenuItem value="Present">Present</MenuItem>
                                <MenuItem value="Absent">Absent</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{ marginTop: '40px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="sticky table">
                    <TableHead sx={{ background: 'linear-gradient(to left, #07a7af, #01519a)' }}>
                        <TableRow>
                            <TableCell align="left" sx={{ color: '#FFFFFF' }}>Name</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Date</TableCell>
                            <TableCell align="center" sx={{ color: '#FFFFFF' }}>Attendance</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAttendance.map((attendance) => (
                            <TableRow
                                key={attendance.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {attendance.name}
                                </TableCell>
                                <TableCell align="center">{formatDate(attendance.date)}</TableCell>
                                <TableCell align="center">{attendance.present ? "Present" : "Absent"}</TableCell>
                            
                                <TableCell align="center" container spacing={1}
                                display="flex" alignItems="center" justifyContent="space-between"   direction={"row"} >
                                    
                                    <Button variant='contained' color='Primary' href="/admin/updateAttendance" style={{marginBottom:'10px', marginRight:'10px'}} sx={{ margin: '5px', color: '#FFFFFF' }} onClick={() => {}}>Update</Button>
                                        
                                    <Button variant='contained' color='Secondary' style={{marginBottom:'10px', marginLeft:'10px'}} sx={{ margin: '5px' }} onClick={(event) => onSubmitDeleteAttendance(event, attendance.name)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <Button size="small" color="#07a7af" variant='contained' href="/admin/addAttendance" style={{margintop:'200px', marginLeft:'1000px'}}> Add Attendance</Button> */}

            <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Deleting Success!
                </Alert>
            </Snackbar><Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Deleting Failed!
                </Alert>
            </Snackbar>
        
    </>
        
    );
}

export default DisplayAttendance;