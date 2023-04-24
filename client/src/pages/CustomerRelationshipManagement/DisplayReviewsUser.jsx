import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DisplayReviewsUser = () => {

    const loggedUser = useSelector((state) => state.user)

    const [allReviews, setAllReviews] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [id, setID] = useState(loggedUser.email);
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        const getReviews = () => {
            axios.get('http://localhost:8090/review/' + loggedUser.email).then((res) => {
                setUserReviews(res.data);
            }).catch((err) => {
                alert('Unable to get all Reviews ' + err.message);
            })
        }
        getReviews();
    }, []);

    useEffect(() => {
        const getAllReviews = () => {
            axios.get('http://localhost:8090/review').then((res) => {
                setAllReviews(res.data);
            }).catch((err) => {
                alert('Unable to get all Reviews ' + err.message);
            })
        }
        getAllReviews();
    }, []);

    const onSubmitDeleteReviews = (id) => {
        // event.preventDefault();

        axios.delete(`http://localhost:8090/review/delete/${id}`).then((res) => {
            alert('User Deleted')
        }).catch((err) => {
            alert('User Delete Uns')
        })
    }

        const theme = useTheme();
        return (
            <>
                <Grid display="flex" alignItems="center" justifyContent="center"><Grid item><Button href="/user/addReviews" size="normal" color="primary" style={{ marginBottom: '10px' }}>Add Reviews</Button></Grid></Grid>
                <Grid container spacing={2}>
                    {userReviews.map((review) => (
                        <Grid item key={review.id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea sx={{ height: '100%' }}>

                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                            {review._id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {review.text}
                                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                                {review.rating}
                                            </Typography>
                                        </Typography>
                                        <p>Reply : {review.reply}</p>
                                    </CardContent>
                                </CardActionArea>
                                <Card style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button size="small" color="primary" href="/user/updateReviews">Update</Button>
                                    <Button size="small" color="primary" onClick={() => {onSubmitDeleteReviews(review._id)}}>Delete</Button>
                                </Card>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid display="flex" alignItems="center" justifyContent="center"><Grid item></Grid></Grid>
                <Grid container spacing={2}>
                    {allReviews.map((review) => (
                        <Grid item key={review.id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea sx={{ height: '100%' }}>

                                    <CardContent>
                                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                            {review.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {review.text}
                                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                                {review.rating}
                                            </Typography>
                                        </Typography>
                                        <p>Reply : {review.reply}</p>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </>
        )
    }

    export default DisplayReviewsUser;
