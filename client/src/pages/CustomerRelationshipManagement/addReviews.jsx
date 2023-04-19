import React, { useState } from 'react';
import { TextField, Rating, Button, Grid } from '@mui/material';
import { useSelector } from 'react-redux';

const ReviewForm = () => {

  const loggedUser = useSelector((state) => state.user)

  const [id, setID] = useState(loggedUser.email);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {

      text: comment,
      author: id,
      rating: rating

  };

  axios.post('http://localhost:8090/review/add', newProduct).then(() => {
      alert('Adding Successful!')
      window.location.href = '/review'

      setID('');
      setComment('');
      setRating('');


  }).catch((err) => {
      alert('Review adding failed! ' + err)
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
              value={id}
              margin="normal"
              sx={{ width: 300, display: "none" }} />
          </Grid>

          <Grid item>
            <TextField

              label="Comment"
              type="text"
              margin="normal"
              multiline
              sx={{ width: 300 }} />
          </Grid>

          <Grid item>
            <Rating
              label="Ratings"
              margin="normal"
              name="simple-controlled" />

          </Grid>

          <Grid item>
            <Button variant="contained" margin="normal" color="primary" type="submit">Add Review</Button>
          </Grid>

        </Grid>

      </form >

    </>
  )
};

export default ReviewForm;