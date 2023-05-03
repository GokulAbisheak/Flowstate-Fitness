import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Grid
} from '@material-ui/core';
import axios from 'axios';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         marginTop: theme.spacing(2),
//     },
//     container: {
//         maxHeight: 500,
//     },
//     title: {
//         marginBottom: theme.spacing(2),
//     },
//     empty: {
//         textAlign: 'center',
//         marginTop: theme.spacing(2),
//     },
// }));

const Cart = () => {
    // const classes = useStyles();
    const [cartItems, setCartItems] = useState([]);
    const loggedInUser = useSelector((state) => state.user);

    useEffect(() => {
        const getCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/cart/${loggedInUser}`);
                setCartItems(response.data.cartItems);
            } catch (error) {
                alert('Error fetching cart items ' + error.message);
            }
        };
        getCartItems();
    }, [loggedInUser]);

    // const removeFromCart = async (productId) => {
    //     try {
    //         await axios.put(`http://localhost:8090/cart/remove/${loggedInUser}/${productId}`);
    //         const updatedCartItems = cartItems.filter((item) => item.productID !== productId);
    //         setCartItems(updatedCartItems);
    //     } catch (error) {
    //         alert('Error removing product from cart ' + error.message);
    //     }
    // };

    return (
        <Grid>
            <Typography variant="h4">
                Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography variant="h6">
                    Your cart is empty
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="cart table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.productID}>
                                    <TableCell component="th" scope="row">
                                        {item.productName}
                                    </TableCell>
                                    <TableCell>Rs. {item.price}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>Rs. {item.bill}</TableCell>
                                    <TableCell>
                                        <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.productID)}>
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Grid>
    );
};

export default Cart;