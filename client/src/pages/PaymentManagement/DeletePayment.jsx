import React, { useState } from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';
import axios from 'axios';

const DeletePayment = () => {

    const [paymentID, setPID] = useState("");

    const theme = useTheme();

    const onSubmitDeletePayments = async event => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/product/delete/${paymentID}`);
            alert('Payment Deleting Successful!');
        } catch (err) {
            alert('Payment deleting failed! ' + err)
        }
    };

    return (

        <>

            <Grid display="flex" justifyContent="center"><h1>Delete Payment Here</h1></Grid>

            <form onSubmit={onSubmitDeletePayments}>

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
                            name="paymentID"
                            label="Payment ID"
                            type="text"
                            margin="normal"
                            value={paymentID}
                            sx={{ width: 300 }}
                            onChange={(e) => {
                                setPID(e.target.value)
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

export default DeletePayment;