import React, {useState} from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';
import axios from 'axios';

const DeleteAttendance = () => {

    const [name, setName] = useState("");

    const theme = useTheme();

    const onSubmitDeleteAttendance = async (attendance, name) => {
        attendance.preventDefault();

        try {
            axios.delete(`http://localhost:8090/attendance/delete/${name}`);
            alert('Deleting Successful!');
        } catch (err) {
            alert('Attendance deleting failed! ' + err)
        }
    };

    return (

        <>

            <Grid display="flex" justifyContent="center"><h1>Delete Attendance Here</h1></Grid>

            <form>

                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    container spacing={2}
                    direction={"column"}
                >

                    <Grid item>
                        <TextField

                            id="id-input"
                            name="name"
                            label="Name"
                            type="text"
                            margin="normal"
                            value={name}
                            sx={{ width: 300 }}
                            onChange={(e) => {
                                setName(e.target.value)
                                
                            }} />
                    </Grid>

                    <Grid item>
                        <Button variant="contained" margin="normal" color="primary" type="submit" onClick={(event) => onSubmitDeleteAttendance(event, attendance.name)}>Delete</Button>
                    </Grid>

                </Grid>

            </form>

        </>
    )
}

export default DeleteAttendance;