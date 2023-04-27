import React, { useState } from 'react';
//import { Alert, Box, Button, IconButton, Input, Snackbar, TextField, useTheme } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InputLabel, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Grid, Select, FormControl } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },

}));

function AddSession() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = (session) => {
    session.preventDefault();

    const newSession = {
      title: title,
      start: start,
      end: end,
      description: description,
    };

    axios.post('http://localhost:8090/session/add', newSession).then(() => {
      alert('Adding Successful!')
      window.location.href = '/admin/schedule'

      setTitle('');
      setStart('');
      setEnd('');
      setDescription('');
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const SimpleSelect = () => {
  // const classes = useStyles();
  // const [description, setDescription] = useState('');

      const handleChange = (session) => {
          setDescription(session.target.value);
      };

  return (

    <form className={classes.root} onSubmit={handleSubmit}>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(session) => setTitle(session.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="start"
            helperText="Session starting time"
            type="datetime-local"
            variant="outlined"
            value={start}
            onChange={(session) => setStart(session.target.value)}
            fullWidth
            required={true}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="end"
            helperText="Session ending time"
            type="datetime-local"
            variant="outlined"
            value={end}
            onChange={(session) => setEnd(session.target.value)}
            fullWidth
            required={true}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>

          <InputLabel id="demo-simple-select-label">Select an option</InputLabel>
          <Select
            //id="description"
            label="Description"
            variant="outlined"
            // value={description}
            // onChange={(session) => setDescription(session.target.value)}
            fullWidth
            required={true}
            // labelId="demo-simple-select-label"
            // id="demo-simple-select"
            value={description}
            onChange={handleChange}>
            
            <MenuItem value="option1">Fitness</MenuItem>
            <MenuItem value="option2">Cardio</MenuItem>
            <MenuItem value="option3">Strength and Conditioning</MenuItem>
            <MenuItem value="option4">Crossfit</MenuItem>
            <MenuItem value="option5">Mobility</MenuItem>
            <MenuItem value="option5">Recovery</MenuItem>
          </Select>


          </FormControl>
          
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" sx={{ mt: 3, borderRadius: '16px', p: '12px 24px' }} variant="contained" color="primary">
            Add Session
          </Button>
        </Grid>
      </Grid>
    </form>

  );

}


export default AddSession;



