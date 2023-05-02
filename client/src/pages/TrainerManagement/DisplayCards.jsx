import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Avatar } from '@mui/material';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to bottom, #0d253f, #1d3d5c)',
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

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
<Grid container spacing={1} sx={{ mt:1  }}>
  {allTrainers.map((trainer) => (
    <Grid item key={trainer.email} xs={12} sm={6} md={4} lg={3} sx={{ flexGrow: 1 }}>
        <Link to={`/trainers/${trainer.email}`}></Link>
      <Card sx={{ height: '100%' }}>
        <CardActionArea sx={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
            <Avatar {...stringAvatar(trainer.firstName)} sx={{ width: 56, height: 56 }} />
          </div>
          <CardContent>
            <GradientBox>
              <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                {trainer.firstName} {trainer.lastName}
              </Typography>
            </GradientBox>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  ))}
</Grid>

  );
};

export default DisplayCards;
