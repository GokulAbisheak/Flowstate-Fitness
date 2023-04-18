import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

function AddAttendance() {
  const classes = useStyles();
  const [date, setDate] = useState('');
  const [present, setPresent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/attendance', {
      date,
      present,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <div>
        <TextField
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              checked={present}
              onChange={(event) => setPresent(event.target.checked)}
              name="present"
            />
          }
          label="Present"
        />
      </div>
      <Button variant="contained" color="primary" type="submit">
        Add Attendance
      </Button>
    </form>
  );
}

export default AddAttendance;