import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';


const TrainerScreen = () => {
    /*const [allTrainers, setAllTrainers] = useState([]);

    useEffect(() => {
        const getAllTrainers = () => {
            axios.get('http://localhost:8090/trainer/get').then((res) => {
                setAllTrainers(res.data);
            }).catch((err) => {
                alert('Unable to get all trainers ' + err.message);
            })
        }
        getAllTrainers();
    }, [])*/

    
    return(
        /*<Grid container spacing={2}>
            {allTrainers.map((trainer) => (
                <Grid item key={trainer.id} xs={12} sm={6} md={4}>
                    <Card />
                </Grid>
            ))}
        </Grid>*/
        <>
            <h1>All Students</h1>
        </>
    );

}

export default TrainerScreen;
