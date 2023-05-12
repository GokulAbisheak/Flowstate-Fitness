import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Box, Card, Grid, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button, FormControl, Select, MenuItem } from '@material-ui/core'; import axios from 'axios';

const GradientBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(to bottom, #0d253f, #1d3d5c)',
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
}));

const ProductScreen = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        if (event.target.value === 'All Products') {
            setFilteredProducts(allProducts);
        } else {
            const filtered = allProducts.filter(product => product.productCategory === event.target.value);
            setFilteredProducts(filtered);
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8090/product');
                setAllProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (productID) => {

        if (cart.some((item) => item.productID === productID)) {
            alert("Product Already in cart")
        } else {
            const item = filteredProducts.find((product) => product.productID === productID);
            console.log(item)
            axios.post('http://localhost:8090/cart/add', {
                productID: item.productID,
                productName: item.productName,
                productPrice: item.price,
                numberOfUnits: 1,
            })
                .then((response) => {
                    console.log(response);
                    const newCartItem = response.data;
                    setCart((prevCart) => [...prevCart, newCartItem]);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    useEffect(() => {
        console.log(cart);
    }, [cart]);

    const theme = useTheme();

    const loggedInUser = useSelector((state) => state.user);

    const handleBuyNow = (productPrice) => {
        // Redirect to the payment page with the product price as a parameter
        window.location.href = `user/mnpayment?productPrice=${productPrice}`;
    };

    return (
        <>
            <Grid
                container spacing={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
                direction={"column"}>
                <Grid item>
                    <Grid>
                        <FormControl variant="outlined" sx={{ minWidth: 400, mt: 2, mb: 6 }}>
                            <Select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Select a category' }}
                            >
                                <MenuItem value="" disabled>
                                    Filter Products
                                </MenuItem>
                                <MenuItem value="All Products">All Products</MenuItem>
                                <MenuItem value="Weights">Weights</MenuItem>
                                <MenuItem value="Resistance Bands">Resistance Bands</MenuItem>
                                <MenuItem value="Workout Clothes">Workout Clothes</MenuItem>
                                <MenuItem value="Protein">Protein Supplements</MenuItem>
                                <MenuItem value="Vitamins">Vitamins</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 4 }}>
                {filteredProducts.map((product) => (
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
                                <Button size="small" color="primary" onClick={() => handleBuyNow(product.price)}>Buy Now</Button>
                                <Button size="small" color="primary" onClick={() => addToCart(product.productID)}>Add to cart</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default ProductScreen;