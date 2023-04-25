import React, {useState} from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';
import axios from 'axios';

const DeleteAttendance = () => {

    const [name, setName] = useState("");

    const theme = useTheme();

    const onSubmitDeleteAttendance = async event => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/product/delete/${productID}`);
            alert('Deleting Successful!');
        } catch (err) {
            alert('Attendance deleting failed! ' + err)
        }
    };

    return (

        <>

            <Grid display="flex" justifyContent="center"><h1>Delete Attendance Here</h1></Grid>

            <form onSubmit={onSubmitDeleteAttendance}>

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
                            value={productID}
                            sx={{ width: 300 }}
                            onChange={(e) => {
                                setName(e.target.value)
                                
                            }} />
                    </Grid>

                    <Grid item>
                        <Button variant="contained" margin="normal" color="primary" type="submit">Delete</Button>
                    </Grid>

                </Grid>

            </form>

        </>
    )
}

export default DeleteAttendance;