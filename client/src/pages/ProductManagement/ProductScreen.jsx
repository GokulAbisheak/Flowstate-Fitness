import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProductScreen = () => {
    const [allProducts, setAllProducts] = useState([]);

    const addToCart = (productId, quantity) => {
        axios.post('http://localhost:8090/cart/add', {
            productId,
            quantity,
        })
        .then(() => {
            alert('Product added to cart!');
        })
        .catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        const getAllProducts = () => {
            axios.get('http://localhost:8090/product').then((res) => {
                setAllProducts(res.data);
            }).catch((err) => {
                alert('Unable to get all products ' + err.message);
            })
        }
        getAllProducts();
    }, [])

    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            {allProducts.map((product) => (
                <Grid item key={product.productId} xs={12} sm={6} md={4}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.url} // the image URL from Cloudinary
                                alt={product.productName}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.productName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.productCategory}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.mfgDate}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.expDate}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }} >
                            <Button size="small" color="primary">Buy Now</Button>
                            <Button size="small" color="primary" onClick={() => addToCart(product.productID, 1)}>Add to cart</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}

export default ProductScreen;



/* import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { Alert, Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';


const ProductScreen = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [productID, setProductID] = useState('');
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState('');

    const addToCart = () => {
        axios.post('http://localhost:8090/cart/add', {
            productId,
            quantity,
        })
            .then(() => {
                alert('Product added to cart!');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const getAllProducts = () => {
            axios.get('http://localhost:8090/product').then((res) => {
                setAllProducts(res.data);
            }).catch((err) => {
                alert('Unable to get all products ' + err.message);
            })
        }
        getAllProducts();
    }, [])

    const getProduct = (productID) => {
        axios.get(`http://localhost:8090/product/${productID}`).then((res) => {
            setProductID(res.data.productID);
            setProductName(res.data.productName);
            setProductDescription(res.data.description);
            setProductImage(res.data.url);
        }).catch((err) => {
            alert('Unable to get product ' + err.message);
        })
    }

    const theme = useTheme();
    return (

        <Grid
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            container spacing={2}
            direction={"column"}>

            {allProducts.map((product) => (

                <Grid item>

                    <Card sx={{ maxWidth: 100 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Product Name
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000
                                    species, ranging across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions style={{ display: 'flex', justifyContent: 'space-between' }} >
                            <Button size="small" color="primary">Buy Now</Button>
                            <Button size="small" color="primary">Add to cart</Button>
                        </CardActions>
                    </Card>

                </Grid>
            ))}


        </Grid>

    )
}

export default ProductScreen; */