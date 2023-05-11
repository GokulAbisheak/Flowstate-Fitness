import React, { useState } from 'react';
//import { Alert, Box, Button, IconButton, Input, Snackbar, TextField, useTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Grid } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function UpdateAttendance() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [present, setPresent] = useState(false);
    const [absent, setAbsent] = useState(false);

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     //Create new attendance
    //     const newAttendance = {
    //         name: name,
    //         date: date,
    //         present: present,
    //         absent: absent,
    //     };

    //     axios.patch(`http://localhost:8090/attendance/update/${name}`, newAttendance).then(() => {
    //         alert('Update Successful!')
    //         window.location.href = '/admin/attendance'

    //         setName('');
    //         setDate('');
    //         setPresent('');
    //         setAbsent('');
    //     })
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // };

    const handleSubmit = (attendance) => {
        attendance.preventDefault();
      
        // Create updated attendance object
        const updatedAttendance = {};
        if (date !== '') {
          updatedAttendance.date = date;
        }
        if (present !== '') {
          updatedAttendance.present = present;
        }
        if (absent !== '') {
          updatedAttendance.absent = absent;
        }
      
        // Make API call to update attendance
        axios.patch(`http://localhost:8090/attendance/updatebyname?name=${name}&date=${date}`, updatedAttendance)
          .then(() => {
            alert('Update Successful!')
            window.location.href = '/admin/attendance';
          })
          .catch((error) => {
            console.error(error);
          });
      };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <Grid

                display="flex"
                justifyContent="center"
                alignItems="center"
                container spacing={2}
                direction={"column"}>

                <Grid item>
                    <TextField
                        id="name"
                        label="Please enter your name"
                        type="text"
                        margin='normal'
                        variant="outlined"
                        required={true}
                        value={name}
                        onChange={(attendance) => setName(attendance.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="date"
                        helperText="Please enter a date"
                        type="date"
                        margin='normal'
                        variant="outlined"
                        value={date}
                        required={true}
                        onChange={(attendance) => setDate(attendance.target.value)}
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={present}
                                onChange={(attendance) => setPresent(attendance.target.checked)}
                                name="present"
                                // required={true}
                            />
                        }
                        label="Present"
                        
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={absent}
                                onChange={(attendance) => setAbsent(attendance.target.checked)}
                                name="absent"
                                // required={true}
                            />
                        }
                        label="Absent"
                        
                    />
                </Grid>
                <Button variant="contained" color="primary" type="submit" margin="normal" style={{marginTop:'40px', marginBottom:'10px'}}>
                    Update Attendance
                </Button>

                <Button variant="contained" color="primary" type="submit" href="/admin/attendance" margin="normal" style={{marginTop:'20px'}} >
                    View Attendance
                </Button>

            </Grid>

        </form>
    );
}

export default UpdateAttendance;