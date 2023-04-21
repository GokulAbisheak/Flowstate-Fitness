import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Box, useTheme } from '@mui/material';
import React, {useState} from "react";
import axios from 'axios';

const MembershipPayment = () => {

    const [paymentID, setPID] = useState("");
    const [paymentAmount, setPAmount] = useState("");
    const [paymentDescription, setPDescription] = useState("");

    const theme = useTheme();

    const onSubmitMembershipPayment = (event) => {
        event.preventDefault();

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mernpro")
        data.append("cloud_name", "dloxej4xv")
        fetch("https://api.cloudinary.com/v1_1/dloxej4xv/image/upload", {
            method:"POST",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setURL([...url, data.url])
        })
        .catch(err=>{
            console.log(err)
        })

        const newPayment = {
            paymentID: paymentID,
            paymentAmount: paymentAmount,
            paymentDescription: paymentDescription,
            paymentDate: paymentDate,
            pAddressl1: pAddressl1,
            pAddressl2: pAddressl2,
            pAddressl3: pAddressl3,
            pState: pState,
            pZip: pZip,
            pCountry: pCountry
        };

        axios.post('http://localhost:8090/payment/add', newPayment).then(() => {
            alert('Adding Successful!')
            window.location.href = '/payment'

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

        }).catch((err) => {
            alert('Payment adding failed! ' + err)
        })
  };

}

export default MembershipPayment ;