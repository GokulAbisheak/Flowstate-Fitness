import React, { useState, useEffect } from 'react';
import { Rating, useTheme, Snackbar, Alert } from '@mui/material';
import { Box,Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button, FormControl,Select,MenuItem } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const GradientBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(to bottom, #0d253f, #1d3d5c)',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
}));

const DisplayReviewsUser = () => {

    const loggedUser = useSelector((state) => state.user)

    const [allReviews, setAllReviews] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const [id, setID] = useState(loggedUser.email);
    const [deleteId, setDeleteId] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [selectedRating, setSelectedRating] = useState('');

    const handleCategoryChange = (event) => {
        setSelectedRating(event.target.value);
        if (event.target.value === 'All Reviews') {
            setFilteredReviews(allReviews);
        } else {
            const filtered = allReviews.filter(review => review.rating === event.target.value);
            setFilteredReviews(filtered);
        }
    }

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
                setFilteredReviews(res.data);
            }).catch((err) => {
                alert('Unable to get all Reviews ' + err.message);
            })
        }
        getAllReviews();
    }, []);

    const onSubmitDeleteReviews = (id) => {
        //event.preventDefault();

        axios.delete(`http://localhost:8090/review/delete/${id}`).then((res) => {
            //alert('User Deleted')
            handleOpenSuccess();
            setAllReviews(allReviews.filter((review) => review.id !== id));
        }).catch((err) => {
            //alert('User Delete Uns')
            handleCloseError();
        })
    }
    const handleOpenSuccess = () => {
        setOpenSuccess(true);
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
                <Grid display="flex" alignItems="center" justifyContent="center" container spacing={2}><Grid item><Button variant='contained' href="/user/addReviews" size="normal" color="primary" style={{ marginBottom: '10px' }}>Add Reviews</Button></Grid></Grid>
                <Grid 
                container spacing={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                direction={"column"}>
                <Grid item>
                    <Grid>
                        <FormControl variant="outlined" sx={{ minWidth: 400, mt: 2, mb: 6 }}>
                            <Select
                                value={selectedRating}
                                onChange={handleCategoryChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select a category' }}
                            >
                                <MenuItem value="" disabled>
                                    Reviews
                                </MenuItem>
                                <MenuItem value="All Reviews">All Reviews</MenuItem>
                                <MenuItem value={5}>Five Star</MenuItem>
                                <MenuItem value={4}>Four Star</MenuItem>
                                <MenuItem value={3}>Three Star</MenuItem>
                                <MenuItem value={2}>Two Star</MenuItem>
                                <MenuItem value={1}>One Star</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
                <Grid container spacing={2}>
                    {filteredReviews.map((review) => (
                        <Grid item key={review.id} xs={12} sm={6} md={4}>
                            <Card sx={{ height: '100%' }}>
                                <CardActionArea sx={{ height: '100%' }}>

                                    <CardContent><GradientBox>
                                        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                            {/* {review._id} */}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {review.text}
                                            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                                {/* {review.rating} */}
                                                  <Rating
                                            label="Ratings"
                                            margin="normal"
                                            name="simple-controlled"
                                            value={review.rating}
                                            readOnly
                                             /> 
                                            </Typography>
                                        </Typography></GradientBox>
                                        <p>Reply : {review.reply}</p>
                                    </CardContent>
                                </CardActionArea>
                                <Card style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button size="small" color="primary" style={{ marginLeft: '10px', marginBottom: '10px' }}  href="/user/updateReviews"startIcon={<ModeEditIcon  />}  variant='contained'>Update</Button>
                                    <Button size="small" color="primary"  style={{ marginRight: '10px',marginBottom: '10px'}} variant='contained' startIcon={<DeleteIcon />} onClick={() => {onSubmitDeleteReviews(review._id)}}>Delete</Button>
                                </Card>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid display="flex" alignItems="center" justifyContent="center"><Grid item></Grid></Grid>
                <Grid container spacing={2}>
                    {filteredReviews.map((review) => (
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
                                                {/* {review.rating} */}
                                                <Rating
                                            label="Ratings"
                                            margin="normal"
                                            name="simple-controlled"
                                            value={review.rating}
                                            readOnly
                                             /> 
                                            </Typography>
                                        </Typography>
                                        <p>Reply : {review.reply}</p>
                                    </CardContent>
                                </CardActionArea>

                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Deleting Success!
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Deleting Failed!
                </Alert>
            </Snackbar>
            </>
        )
    }

    export default DisplayReviewsUser;
