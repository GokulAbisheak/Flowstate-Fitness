import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Avatar, useTheme } from '@mui/material';
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
    <>
    {<banner>
      <img src="/assets/Trainer.jpeg" alt="" style={{ width: "100%", height: "400px", objectFit: "cover", objectPosition: "top" }} />
    </banner> }
    <Grid container spacing={4} sx={{ 
      px: 3,
      mt: 3,  
    }}
    fullWidth
      >
      {allTrainers.map((trainer) => (
        <Grid item key={trainer.email} xs={12} sm={6} md={4} lg={3} sx={{
         }}>
          
            <Card sx={{ 
              py:5,
              borderRadius: '12px',
              boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.1)",
              height: '100%' }}
              elevation={0}>
              <CardActionArea sx={{ height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: "center", paddingTop: '20px' }}>
                  <Avatar src ={trainer.url} sx={{ width: 76, height: 76 }} />
                </div>
                <CardContent>
                  <Box sx={{ 
                      outline: '1px solid #000'
                    }}>
                      <Link 
                      style={{
                        textDecoration: 'none',
                      }}
          to={`/trainers/${trainer.email}`}>
                    <Typography sx={{ 
                      boxShadow: "0px 1px 0px 0.5px rgba(0, 0, 0, 0.1)",
                      borderRadius: "12px",
                      py: 1,
                      color: '#000',
                      textAlign: 'center' }}>
                      {trainer.firstName} {trainer.lastName}
                    </Typography>
                    </Link>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          
        </Grid>
      ))}
    </Grid>
  </>
  
  );
};

export default DisplayCards;
