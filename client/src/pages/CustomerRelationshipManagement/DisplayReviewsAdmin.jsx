import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DisplayReviewsAdmin = () => {

    const loggedUser = useSelector((state) => state.user)

    const [allReviews, setAllReviews] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [id, setID] = useState(loggedUser.email);
    const [email, setEmail] = useState('');
    const [reply, setReply] = useState('');

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

    const onSubmitReplyReviews = async event => {
        event.preventDefault();

        // try {
        //     axios.delete(`http://localhost:3030/review/delete`);
        //     alert('Review deleted.');
        // } catch (err) {
        //     alert('Product deleting failed! ' + err)
        // }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        console.log('f')
        axios.patch('http://localhost:8090/review/update/email/' + email, { reply: reply }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const theme = useTheme();
    return (
        <>
            <Grid display="flex" alignItems="center" justifyContent="center"><Grid item><Button size="normal" color="primary" style={{ marginBottom: '10px' }}> Reviews</Button></Grid></Grid>
            <Grid container spacing={2}>
                {userReviews.map((review) => (
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
                                </CardContent>
                            </CardActionArea>
                            <Card style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <form onSubmit={handleReply}>

                                    <TextField
                                        type="text"
                                        margin="normal"
                                        sx={{ width: 300, display: "none" }}
                                        onChange={(e) => {
                                            setReply(e.target.value)
                                            setEmail(review.author)
                                            console.log(review.author)
                                            console.log((e.target.value))
                                        }} />
                                    <Button type="submit" size="small" color="primary">Reply</Button>
                                </form>
                            </Card>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* <Grid display="flex" alignItems="center" justifyContent="center"><Grid item><Button size="normal" color="primary" style={{ marginBottom: '10px' }}>Add Reviews</Button></Grid></Grid>
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
                                </CardContent>
                            </CardActionArea>

                        </Card>
                    </Grid>
                ))}
            </Grid> */}
        </>
    )
}

export default DisplayReviewsAdmin;
