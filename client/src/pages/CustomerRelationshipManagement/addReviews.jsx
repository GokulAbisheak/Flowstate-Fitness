import React, { useState } from 'react';
import { TextField, Rating, Button,Snackbar,Alert, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ReviewForm = () => {

  const loggedUser = useSelector((state) => state.user)

  const [id, setID] = useState(loggedUser.email);//(loggedUser.email);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {

      text: comment,
      author: id,
      rating: rating

  };

  axios.post('http://localhost:8090/review/add', newReview).then(() => {
     
      //alert('Adding Successful!')
      // window.location.href = '/review'

      // setID('');
      setComment('');
      setRating('');
      handleOpenSuccess();
      //window.location.href = '/user/displayReviewUser'


  }).catch((err) => {
    handleOpenError();
      //alert('Review adding failed! ' + err)
  })
    /* fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, comment, rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Review submitted successfully:', data);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      }); */
  };

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

  return (
    <>
    

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

              label="UserID"
              type="text"
              // value={id}
              margin="normal"
              sx={{ width: 300, display: "none" }}/>
          </Grid>

          <Grid item>
            <TextField

              label="Comment"
              type="text"
              margin="normal"
              required ={true}
              multiline
              sx={{ width: 300 }} 
              onChange={(e) => {
                setComment(e.target.value)
            }}/>
          </Grid>

          <Grid item>
            <Rating
              label="Ratings"
              margin="normal"
              required ={true}
              name="simple-controlled" 
              onChange={(e) => {
                setRating(e.target.value)
            }}/>

          </Grid>

          <Grid item>
            <Button variant="contained" margin="normal" color="primary" type="submit">Add Review</Button>
          </Grid>

        </Grid>

      </form >

      <Snackbar open={openSuccess} autoHideDuration={5000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Review Adding Success!
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseError} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Review Adding Failed!
                </Alert>
            </Snackbar>

    </>
  )
};

export default ReviewForm;