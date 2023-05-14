import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Avatar, useTheme ,IconButton,TextField,Button} from '@mui/material';
import styled from '@mui/material/styles/styled';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import {  useNavigate } from 'react-router-dom';


const DisplayCards = () => {
  
  const [allTrainers, setAllTrainers] = useState([]);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("");
  const[description,setDescription] = useState("")

  const [oldEmail, setOldEmail] = useState("");

  const theme = useTheme();

  useEffect(() => {
    axios.get('http://localhost:8090/trainer/get')
      .then((res) => {
        setAllTrainers(res.data);
      })
      .catch((err) => {
        console.error('Error getting all trainers:', err);
      });
  }, []);

  const displayUpdateForm = () => {
    document.getElementById('update-box').style.display = "block";
}

const hideUpdateForm = () => {
    document.getElementById('update-box').style.display = "none";
    setFName('');
    setLName('');
    setEmail('');
    setDateOfBirth('');
    setPhoneNumber('');
    setOldEmail('');
}

const getTrainer = (email) => {
  axios.get(`http://localhost:8090/trainer/get/${email}`).then((res) => {
      setFName(res.data.firstName);
      setLName(res.data.lastName);
      setEmail(res.data.email);
      setDateOfBirth(res.data.dateOfBirth);
      setPhoneNumber(res.data.phoneNumber);
      setOldEmail(res.data.email);
      setQualification(res.data.qualification);
      setDescription(res.data.description);
      
  }).catch((err) => {
      alert('Unable to get trainer ' + err.message);
  })
}

const navigate = useNavigate()

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

                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                  <Avatar  sx={{ width: 76, height: 76 }} />
                </div>
                <CardContent>
                  <Box sx={{ 
                      
                    }}
                   
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
                  </Box>
                </CardContent>
                <Button variant='contained' color='primary' sx={{ margin: '5px', color: '#FFFFFF' }} onClick={() => {
                                        getTrainer(trainer.email);
                                        displayUpdateForm();
                                    }}>view more</Button>
            </Card>
          
        </Grid>
      ))}
    </Grid>

    <Box sx={{    display: 'flex',
    justifyContent: 'flex-end',
    position: "absolute",
    top: '84px',
    right: '10px' }}>
  <Button
    color='primary'
    variant='contained'
    aria-label='trainerApp'
    sx={{ margin: '5px 20px 5px 5px', color: '#FFFFFF' }}
    onClick={()=>{
       navigate("/user/applyTrainer");
    }}
  >
    Apply to become a Trainer
  </Button>
</Box>

<Box id="update-box" sx={{ backgroundColor: "rgba(0,0,0,0.3)", width: "100%", height: "100%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
<Box maxWidth="500px" height="520px" sx={{ backgroundColor: theme.palette.background.alt, position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)", boxShadow: "0px 0px 10px rgba(0,0,0,0.5)", borderRadius: "5px" }}>
  <IconButton sx={{ float: "right", margin: "5px" }}>
    <CancelIcon onClick={() => { hideUpdateForm() }} />
  </IconButton>
  <Box sx={{ margin: "20px" }}>
      <Typography variant="h5" sx={{ marginBottom: "20px" }}>
        Trainer Details
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        <strong>Email:</strong> {email}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        <strong>First Name:</strong> {fName}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        <strong>Last Name:</strong> {lName}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        <strong>Phone Number:</strong> {phoneNumber}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        <strong>Qualification:</strong> {qualification}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        <strong>Description:</strong> {description}
      </Typography>
    </Box>
    <Button
      type="submit"
      color="primary"
      variant="contained"
      onClick={() => {navigate('/user/addSession')}}
      sx={{ margin: "20px", width: "calc(100% - 40px)" }}
    >
      Make An Appointment
    </Button>
</Box>
</Box>


            
  </>
  
  );
};

export default DisplayCards;