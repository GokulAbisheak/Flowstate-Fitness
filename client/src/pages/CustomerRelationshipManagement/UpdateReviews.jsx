import React from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme, Rating } from '@mui/material';

const UpdateReviews = () => {
    return (

        <>
            <Grid display="flex" justifyContent="center"><h1>Update Reviews</h1></Grid>

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

                            label="User ID"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            label="Comment"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <Rating

                            label="Rating"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <Button variant="contained" margin="normal" color="primary" type="submit">Update</Button>
                    </Grid>

                </Grid>

            </form>
            
        </>
    )
}

export default UpdateReviews;