import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
import axios from 'axios';

const GradientBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(to bottom, #0d253f, #1d3d5c)',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
}));

const ProductScreen = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [productID, setProductID] = useState("");
    const [showMore, setShowMore] = useState(false);

    const addToCart = async () => {
        try {
            const { data } = await axios.post('http://localhost:8090/cart/add', {
                itemID: productID,
                itemName: productName,
                itemPrice: price,
                quantity: 1
            });
            alert('Item added to cart!');
        } catch (err) {
            console.error(err);
            alert('Failed to add item to cart');
        }
    };

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

    const theme = useTheme();

    return (
        <>
            <Grid container spacing={2}>
                {allProducts.map((product) => (
                    <Grid item key={product.productId} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardActionArea sx={{ height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={`${product.url}`}
                                    alt={product.productName}
                                    style={{ height: 350, objectFit: 'cover' }} />
                                <CardContent><GradientBox>
                                    <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                                        {product.productName}
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
                                <Button size="small" color="primary">Buy Now</Button>
                                <Button size="small" color="primary" onClick={addToCart}>Add to cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ProductScreen;