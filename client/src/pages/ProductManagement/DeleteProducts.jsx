import React, {useState} from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';
import axios from 'axios';

const DeleteProducts = () => {

    const [productID, setPID] = useState("");

    const theme = useTheme();

    const onSubmitDeleteProducts = async event => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/product/delete/${productID}`);
            alert('Deleting Successful!');
        } catch (err) {
            alert('Product deleting failed! ' + err)
        }
    };

    return (

        <>

            <Grid display="flex" justifyContent="center"><h1>Delete Products Here</h1></Grid>

            <form onSubmit={onSubmitDeleteProducts}>

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
                            name="productID"
                            label="Product ID"
                            type="text"
                            margin="normal"
                            value={productID}
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

export default DeleteProducts;