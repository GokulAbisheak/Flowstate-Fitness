import React, { useState, useEffect } from 'react';
import { Rating, useTheme ,Snackbar,Alert} from '@mui/material';
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
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

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
            alert('Replied')
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleOpenSuccess = () => {
        setOpenSuccess(true);
        setTimeout(() => {
          window.location.href = '/user/displayReviewUser';
        }, 3000);
    }
    
    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    }
    
    const handleOpenError = () => {
        setOpenError(true);
    }
    
    const handleCloseError = () => {
        setOpenError(false);
    }
    

    const theme = useTheme();
    return (
        <>
            <Grid container spacing={2} display="flex" alignItems="center" justifyContent="center" ><Grid item><h1> Reviews</h1></Grid></Grid>
            <Grid container spacing={2}>
                {allReviews.map((review) => (
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
                                        style={{ marginLeft: '20px', marginBottom: '5px',marginInline:'10px' }}
                                        onChange={(e) => {
                                            setReply(e.target.value)
                                            setEmail(review.author)
                                            console.log(review.author)
                                            console.log((e.target.value))
                                        }} />
                                    <Button type="submit" size="small" color="primary"variant='contained'style={{ marginLeft: '20px',marginBottom: '10px',marginInline:'38px'}} sx={{ margin: "10px 30px", width: "calc(100% - 80px)" }} endIcon={<SendIcon />}>Reply</Button>
                                </form>
                            </Card>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Reply adding Success!
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Adding Failed!
                </Alert>
            </Snackbar>

        </>
    )
}

export default DisplayReviewsAdmin;