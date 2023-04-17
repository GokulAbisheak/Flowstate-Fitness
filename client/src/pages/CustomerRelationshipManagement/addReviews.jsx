import React, { useState } from 'react';
import { TextField, Rating, Button, Grid } from '@mui/material';


const ReviewForm = () => {

  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, comment, rating }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Review submitted successfully:', data);
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
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

              label="Username"
              type="text"
              margin="normal"
              sx={{ width: 300 }} />
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