import React from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';
import axios from 'axios';

const DeleteReviews = () => {

    const [id, setID] = useState("");

    const theme = useTheme();

    const handleDelete = async event => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/review/delete/${id}`);
            alert('Deleting Successful!');
        } catch (err) {
            alert('Review deleting failed! ' + err)
        }
    };

    return (

        <>

            <Grid display="flex" justifyContent="center"><h1>Delete Reviews Here</h1></Grid>

            <form onSubmit={handleDelete}>

                <Grid
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    container spacing={2}
                    direction={"column"}
                >

                    <Grid item>
                        <TextField

                            
                            label="Comment"
                            type="text"
                            margin="normal"
                            value={id}
                            sx={{ width: 300 }}
                            onChange={(e) => {
                                setID(e.target.value)
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

export default DeleteReviews;