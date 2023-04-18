import React, { useState } from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme, Rating } from '@mui/material';
import axios from "axios";

const UpdateReviews = () => {

    const [id, setID] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReview = {

            text: comment,
            author: id,
            rating: rating

        };

        axios.patch(`http://localhost:8090/review/update/${id}`, newReview).then(() => {
            alert('Updating Successful!')
            window.location.href = '/review'

            setID('');
            setComment('');
            setRating('');


        }).catch((err) => {
            alert('Review updating failed! ' + err)
        })}

        return (

            <>
                <Grid display="flex" justifyContent="center"><h1>Update Reviews</h1></Grid>

                <form onSubmit={handleSubmit}>

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
                                sx={{ width: 300 }}
                                onChange={(e) => {
                                    setID(e.target.value)
                                }} />
                        </Grid>

                        <Grid item>
                            <TextField

                                label="Comment"
                                type="text"
                                margin="normal"
                                sx={{ width: 300 }}
                                onChange={(e) => {
                                    setComment(e.target.value)
                                }} />
                        </Grid>

                        <Grid item>
                            <Rating

                                label="Rating"
                                type="text"
                                margin="normal"
                                sx={{ width: 300 }}
                                onChange={(e) => {
                                    setRating(e.target.value)
                                }} />
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