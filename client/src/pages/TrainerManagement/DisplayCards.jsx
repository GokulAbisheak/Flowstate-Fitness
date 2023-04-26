import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Avatar } from '@mui/material';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    
  };
}

const DisplayCards = () => {
  const [allTrainers, setAllTrainers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8090/trainer/get')
      .then((res) => {
        setAllTrainers(res.data);
      })
      .catch((err) => {
        console.error('Error getting all trainers:', err);
      });
  }, []);

  return (
    <Grid container spacing={2}>
      {allTrainers.map((trainer) => (
        <Grid item key={trainer.email} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea sx={{ height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar {...stringAvatar(trainer.firstName)} sx={{ width: 56, height: 56 ,marginTop: '20px'}}/>
                </div>

              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                  Name: {trainer.firstName} {trainer.lastName}
                </Typography>
                <Typography variant="body1" gutterBottom sx={{ textAlign: 'center' }}>
                  Last Name: {trainer.lastName}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DisplayCards;
