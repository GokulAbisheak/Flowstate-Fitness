import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Box, useTheme, TextField, InputAdornment } from '@mui/material';
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

//export default function Main() {
const MainPayment = () => {

  const { amount, desc } = useParams();

  const [paymentID, setPID] = useState("");
  const [paymentAmount, setPAmount] = useState("");
  const [paymentDescription, setPDescription] = useState("");
  const [paymentDate, setPDate] = useState("");
  const [pAddressl1, setPAdr1] = useState("");
  const [pAddressl2, setPAdr2] = useState("");
  const [pAddressl3, setPAdr3] = useState("");
  const [pState, setPState] = useState("");
  const [pProvince, setPProv] = useState("");
  const [pZip, setPZip] = useState("");
  const [pCountry, setPCountry] = useState("");
  const [url, setURL] = useState("");

  const theme = useTheme();

  const onSubmitMainPayment = (event) => {
    event.preventDefault();

    const newPayment = {
      paymentID: paymentID,
      paymentAmount: amount || paymentAmount,
      pDescription: desc || paymentDescription,
      paymentDate: paymentDate,
      pAddressl1: pAddressl1,
      pAddressl2: pAddressl2,
      pAddressl3: pAddressl3,
      pState: pState,
      pZip: pZip,
      pCountry: pCountry,
    };

    axios.post('http://localhost:8090/payment/add', newPayment)
      .then(() => {
        setPID('');
        setPAmount('');
        setPDescription('');
        setPDate('');
        setPAdr1('');
        setPAdr2('');
        setPAdr3('');
        setPState('');
        setPProv('');
        setPZip('');
        setPCountry('');
        setURL('');
        alert('Adding Successful!');
        window.location.href = '/user/adminPayment'
      })
      .catch(err => {
        alert('Payment adding failed! ' + err);
      });
  }

return (

  <form onSubmit={onSubmitMainPayment}>

    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      container spacing={2}
      direction={"column"}

    >

      <Grid item>

        <TextField

          id="id-input"
          name="paymentID"
          label="Payment ID"
          type="text"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPID(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="amount-input"
          name="paymentAmount"
          label="Payment Amount"
          type="text"
          value={amount}
          margin="normal"
          startadornment={<InputAdornment position="start">Rs.</InputAdornment>}
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPAmount(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="description-input"
          name="paymentDescription"
          label="Payment Description"
          type="text"
          margin="normal"
          value={desc}
          multiline
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPDescription(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="payDate-input"
          name="paymentDate"
          helperText="Please select date"
          type="date"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPDate(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="addl1-input"
          name="pAddressl1"
          label="Address Line 1"
          type="text"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPAdr1(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="addl2-input"
          name="pAddressl2"
          label="Address Line 2"
          type="text"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPAdr2(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="addl3-input"
          name="pAddressl3"
          label="Address Line 3"
          type="text"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPAdr3(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="state-input"
          name="pState"
          label="State"
          type="text"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPState(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="province-input"
          name="pProvince"
          label="Province"
          type="text"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPProv(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="zip-input"
          name="pZip"
          label="ZIP code"
          type="text"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPZip(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <TextField

          id="ctry-input"
          name="pCountry"
          label="Country"
          type="text"
          margin="normal"
          sx={{ width: 300 }}
          required={true}
          onChange={(e) => {
            setPCountry(e.target.value);
          }} />
      </Grid>

      <Grid item>
        <Button variant="contained" margin="normal" color="primary" type="submit">Add</Button>
      </Grid>

    </Grid>

  </form>


)}
        



export default MainPayment;
