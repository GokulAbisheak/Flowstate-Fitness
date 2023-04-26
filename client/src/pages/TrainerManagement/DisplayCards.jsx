import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card,CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';





const DisplayCards = () => {
    const [allTrainers, setAllTrainers] = useState([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const getAllTrainers = () => {
            axios.get('http://localhost:8090/trainer/get').then((res) => {
                setAllTrainers(res.data);
            }).catch((err) => {
                alert('Unable to get all trainers ' + err.message);
            })
        }
        getAllTrainers();
    }, [])

    
    return(
        <Grid container spacing={2}>
            {allTrainers.map((trainer) => (
                <Grid item key={trainer.email} xs={12} sm={6} md={4}>
                 <Card sx={{height:"100%"}}>
                    <CardActionArea sx={{height: '100%' }}>
                        
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                Name: {trainer.firstName} {trainer.lastName}
                                </Typography>
                                <Typography variant="" gutterBottom sx={{ textAlign: 'center' }}>
                                Name: {trainer.firstName} {trainer.LastName}
                                </Typography>
                            </CardContent>
                        
                    </CardActionArea>

                 </Card>
                </Grid>
            ))}
        </Grid>
    );

}

export default DisplayCards;
