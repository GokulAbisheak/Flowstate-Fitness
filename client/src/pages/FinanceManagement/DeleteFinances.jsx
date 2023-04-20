import React, {useState} from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';
import axios from 'axios';

const DeleteFinances = () => {

    const [salaryID, setSID] = useState("");

    const theme = useTheme();

    const onSubmitDeleteFinances = async event => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/finance/delete/${salaryID}`);
            alert('Deleting Successful!');
        } catch (err) {
            alert('Salary deleting failed! ' + err)
        }
    };

    return (

        <>

            <Grid display="flex" justifyContent="center"><h1>Delete Salary</h1></Grid>

            <form onSubmit={onSubmitDeleteFinances}>

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
                            name="salaryID"
                            label="Salary ID"
                            type="text"
                            margin="normal"
                            value={productID}
                            sx={{ width: 300 }}
                            onChange={(e) => {
                                setSID(e.target.value)
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

export default DeleteFinances;