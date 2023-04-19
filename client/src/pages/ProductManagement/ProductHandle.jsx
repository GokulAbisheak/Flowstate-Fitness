import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
import axios from 'axios';

const ProductHandle = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [productID, setProductID] = useState("");

    useEffect(() => {
        const getAllProducts = () => {
            axios.get('http://localhost:8090/product').then((res) => {
                setAllProducts(res.data);
                setProductID(res.data)
            }).catch((err) => {
                alert('Unable to get all products ' + err.message);
            })
        }
        getAllProducts();
    }, []);

    const onSubmitDeleteProducts = async event => {
        event.preventDefault();

        try {
            axios.delete(`http://localhost:8090/product/delete/${productID}`);
            alert('Deleting Successful!');
        } catch (err) {
            alert('Product deleting failed! ' + err)
        }
    };

    const theme = useTheme();
    return (
        <>
            <Grid display="flex" alignItems="center" justifyContent="center"><Grid item><Button size="normal" color="primary" style={{ marginBottom: '10px' }}>Add Products</Button></Grid></Grid>
            <Grid container spacing={2}>
                {allProducts.map((product) => (
                    <Grid item key={product.productId} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={`${product.url}`} // the image URL from Cloudinary
                                    alt={product.productName}
                                    style={{ height: 350, objectFit: 'cover' }} />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                        {product.productName}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        {product.productCategory}
                                    </Typography>
                                    <Typography variant="h6" color="primary" gutterBottom>
                                        Rs.{product.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" gutterBottom>
                                        {product.description}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        <strong>Manufacture Date:</strong> {product.mfgDate.substring(0, 10)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
                                        <strong>Expiry Date:</strong> {product.expDate.substring(0, 10)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button size="small" color="primary" href="/admin/updateProducts">Update</Button>
                                <Button size="small" color="primary" onClick={onSubmitDeleteProducts}>Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ProductHandle;