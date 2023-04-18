import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Box, useTheme } from '@mui/material';
import React from 'react';
import FlowTokenIcon from '@mui/icons-material/Pix';
import CreditCardIcon from '@mui/icons-material/CreditCard';

const PurchaseMembership = () => {

    const theme = useTheme();

    const listItem = [
        {
            title: 'Bronze',
            description1: '01 Month Membership',
            description2: 'Exclusive Access to all Membership Features',
            price: '3000 LKR',
            tokenprice: '1000',
            imgurl: '/assets/bronze.jpg',
            flowtokens: 0
        },

        {
            title: 'Silver',
            description1: '06 Month Membership',
            description2: 'Exclusive Access to all Membership Features',
            price: '15000 LKR',
            tokenprice: '5000',
            imgurl: '/assets/silver.jpg',
            flowtokens: 400
        },

        {
            title: 'Gold',
            description1: '12 Month Membership',
            description2: 'Exclusive Access to all Membership Features',
            price: '25000 LKR',
            tokenprice: '8000',
            imgurl: '/assets/gold.jpeg',
            flowtokens: 1000
        }
    ]

    return (
        <>
            <Grid container spacing={2} alignItems="center"
                justifyContent="center"
                style={{ minHeight: 'calc(100vh - 64px)' }}>

                {listItem.map(listDetail => (
                    <Grid item xs={12} lg={4}>
                        <Card sx={{ maxWidth: "350px", margin: "20px auto" }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={listDetail.imgurl}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography align='center' fontWeight='500' textTransform='uppercase' gutterBottom variant="h4" component="div">
                                    {listDetail.title}
                                </Typography>

                                <Typography align='center' fontWeight='700' textTransform='uppercase' gutterBottom variant="h2" component="div">
                                    {listDetail.price}
                                </Typography>

                                <Typography align='center' variant="h6">
                                    {listDetail.description1}
                                </Typography>
                                <Typography align='center' variant="body2" color="text.secondary" fontWeight={200}>
                                    {listDetail.description2}
                                </Typography>
                                <Typography align='center' variant="body2" color='#4BB543' fontWeight={500}>
                                    {listDetail.flowtokens} FlowTokens Included
                                </Typography>
                                <Box textAlign='center' marginTop={10} padding="0px 3px">
                                    <Button fullWidth variant='contained'>
                                        Purchase
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default PurchaseMembership;
