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

function AddAttendance() {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [present, setPresent] = useState(false);
    const [absent, setAbsent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        //Create new attendance
        const newAttendance = {
            name: name,
            date: date,
            present: present,
            absent: absent
        };

        axios.post('http://localhost:8090/attendance/add',newAttendance).then(() => {
            alert('Adding Successful!')
            window.location.href = '/attendance'

            setName('');
            setDate('');
            setPresent('');
            setAbsent('');
        })
            .then((response) => {
                console.log(response.data);
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
                        required={true}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="date"
                        helperText="Please enter a date"
                        type="date"
                        margin='normal'
                        value={date}
                        required={true}
                        onChange={(event) => setDate(event.target.value)}
                    />
                </Grid>
                <Grid item>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={present}
                                onChange={(event) => setPresent(event.target.checked)}
                                name="present"
                                required={true}
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
                                onChange={(event) => setAbsent(event.target.checked)}
                                name="absent"
                                required={true}
                            />
                        }
                        label="Absent"
                        
                    />
                </Grid>
                <Button variant="contained" color="primary" type="submit" margin="normal">
                    Add Attendance
                </Button>

            </Grid>

        </form>
    );
}

export default AddAttendance;