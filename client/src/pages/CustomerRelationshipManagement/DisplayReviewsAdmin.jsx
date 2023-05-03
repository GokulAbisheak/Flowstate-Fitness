import React, { useState, useEffect } from 'react';
import { Rating, useTheme } from '@mui/material';
import { Box,Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button, TextField } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

const GradientBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(to bottom, #0d253f, #1d3d5c)',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
}));
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
            <Grid container spacing={2} display="flex" alignItems="center" justifyContent="center" ><Grid item><Button size="normal" color="primary" style={{ marginBottom: '10px' }}> Reviews</Button></Grid></Grid>
            <Grid container spacing={2}>
                {userReviews.map((review) => (
                    <Grid item key={review.id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea sx={{ height: '100%' }}>

                                <CardContent> <GradientBox>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                        {review.author}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {review.text}
                                        {/* <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                            {review.rating}
                                        </Typography> */}
                                             <br/> <br/>
                                        <Rating
                                            label="Ratings"
                                            margin="normal"
                                            name="simple-controlled"
                                            value={review.rating}
                                            readOnly
                                             /> 
                                    </Typography> </GradientBox>
                                </CardContent>
                            </CardActionArea>
                            <Card style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <form onSubmit={handleReply}>

                                    <TextField

                                        type="text"
                                        margin="normal"
                                        sx={{ width: 200, display: "none" }}
                                        onChange={(e) => {
                                            setReply(e.target.value)
                                            setEmail(review.author)
                                            console.log(review.author)
                                            console.log((e.target.value))
                                        }} />
                                    <Button type="submit" size="small" color="primary"variant='contained'style={{ marginLeft: '50px',marginBottom: '2px'}} sx={{ margin: "10px 40px", width: "calc(100% - 80px)" }} endIcon={<SendIcon />}>Reply</Button>
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
