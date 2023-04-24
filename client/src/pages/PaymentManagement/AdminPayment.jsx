import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Box, useTheme } from '@mui/material';
import React, {useState} from "react";
import axios from 'axios';

const AdminPayment = () => {

    const [allPayments, setAllPayments] = useState([]);
    const [paymentID, setPaymentID] = useState("");

    useEffect(() => {
        const getAllPayments = () => {
            axios.get('http://localhost:8090/payment').then((res) => {
                setAllPayments(res.data);
                setPaymentID(res.data)
            }).catch((err) => {
                alert('Unable to get all payments ' + err.message);
            })
        }
        getAllPayments();
    }, []);

    const onSubmitDeletePayments = async event => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/payment/delete/${paymentID}`);
            alert('Payment Deleting Successful!');
        } catch (err) {
            alert('Payment deleting failed! ' + err)
        }
    };

    const theme = useTheme();

  return (
    <>
            <Grid display="flex" alignItems="center" justifyContent="center"><Grid item><Button size="normal" color="primary" style={{ marginBottom: '10px' }}>Add Products</Button></Grid></Grid>
            <Grid container spacing={2}>
                {allPayments.map((payment) => (
                    <Grid item key={payment.paymentId} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea sx={{ height: '100%' }}>
                                {/* <CardMedia
                                    component="img"
                                    image={`${payment.url}`} // the image URL from Cloudinary
                                    alt={payment.paymentName}
                                    style={{ height: 350, objectFit: 'cover' }} /> */}
                                <CardContent>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        Rs.{payment.paymentAmount}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        <strong>Payment Date:</strong> {payment.paymentDate.substring(0, 10)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {payment.pDescription}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {payment.pAddressl1}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {payment.pAddressl2}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {payment.pAddressl3}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {payment.pState}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {payment.pProvince}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {payment.pZip}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {payment.pCountry}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* <Button size="small" color="primary" href="/admin/updatePayment">Update</Button> */}
                                <Button size="small" color="primary" onClick={onSubmitDeletePayments}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
  )

}

export default AdminPayment ;