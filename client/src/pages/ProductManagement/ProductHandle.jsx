import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
import {Snackbar, Alert} from '@mui/material'
import axios from 'axios';

const GradientBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(to bottom, #0d253f, #1d3d5c)',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
}));

const ProductHandle = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    useEffect(() => {

        const getAllProducts = () => {
            axios.get('http://localhost:8090/product').then((res) => {
                setAllProducts(res.data);
            }).catch((err) => {
                alert('Unable to get all products ' + err.message);
            })
        }

        getAllProducts();

    }, []);

    const onSubmitDeleteProduct = async (event, productID) => {

        event.preventDefault();

        try {
            await axios.delete(`http://localhost:8090/product/delete/${productID}`);
            //alert('Deleting Successful!');
            handleOpenSuccess();
            setAllProducts(allProducts.filter((product) => product.productID !== productID));
        } catch (err) {
            //alert('Product deleting failed! ' + err);
            handleCloseError();
        }
    };

    const theme = useTheme();

    const handleOpenSuccess = () => {
        setOpenSuccess(true);
    }

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    }

    const handleOpenError = () => {
        setOpenError(true);
    }

    const handleCloseError = () => {
        setOpenError(false);
    }

    return (
        <>
            <Grid
                container spacing={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                direction={"column"}>

                <Grid item>
                    <Button variant="contained" size="normal" color="primary" style={{ marginBottom: '10px' }} href="/admin/addProducts">Add Products</Button>
                </Grid>

            </Grid>

            <Grid container spacing={2}>

                {allProducts.map((product) => (

                    <Grid item key={product.productID} xs={12} sm={6} md={4}>

                        <Card sx={{ height: '100%' }}>

                            <CardActionArea sx={{ height: '100%' }}>

                                <CardMedia
                                    component="img"
                                    image={`${product.url}`}
                                    alt={product.productName}
                                    style={{ height: 400, objectFit: 'cover' }} />

                                <CardContent><GradientBox>

                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                        {product.productName.toUpperCase()}
                                    </Typography>

                                    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        {product.productCategory}
                                    </Typography>

                                    <Typography variant="h6" color="primary" gutterBottom>
                                        Rs.{product.price}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        {showMore
                                            ? (
                                                <>
                                                    {product.description}

                                                    <br /><br />

                                                    {product.productCategory !== 'Weights' && product.productCategory !== 'Resistance Bands' && product.productCategory !== 'Workout Clothes' && (
                                                        <>
                                                            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                                                <strong>Manufacture Date:</strong> {product.mfgDate.substring(0, 10)}
                                                            </Typography>

                                                            <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                                                <strong>Expiry Date:</strong> {product.expDate.substring(0, 10)}
                                                            </Typography>
                                                        </>
                                                    )}

                                                    <span
                                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                                        onClick={() => setShowMore(false)}
                                                    >
                                                        {'See less'}
                                                    </span>
                                                </>
                                            )
                                            : (
                                                <>
                                                    {product.description.slice(0, 200)}...

                                                    <span
                                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                                        onClick={() => setShowMore(true)}
                                                    >
                                                        {'See more'}
                                                    </span>
                                                </>
                                            )
                                        }
                                    </Typography></GradientBox>

                                </CardContent>

                            </CardActionArea>

                            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button size="small" color="primary" href="/admin/updateProducts">Update</Button>
                                <Button size="small" color="primary" onClick={(event) => onSubmitDeleteProduct(event, product.productID)}>Delete</Button>
                            </CardActions>

                        </Card>

                    </Grid>

                ))}

            </Grid>

            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Deleting Success!
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Deleting Failed!
                </Alert>
            </Snackbar>

        </>
    )
}

export default ProductHandle;