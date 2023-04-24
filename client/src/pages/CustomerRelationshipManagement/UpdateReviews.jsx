import React, { useState } from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme, Rating } from '@mui/material';
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateReviews = () => {

    const loggedUser = useSelector((state) => state.user);

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');
    const [email, setEmail] = useState(loggedUser.email);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReview = {

            text: comment,
            rating: rating

        };

        axios.patch(`http://localhost:8090/review/update/email/${email}`, newReview).then(() => {
            alert('Updating Successful!')
            window.location.href = '/review'

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