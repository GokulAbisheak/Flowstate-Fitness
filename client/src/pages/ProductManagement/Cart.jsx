import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);

    //const loggedInUser = useSelector((state) => state.user);

    

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8090/cart');
                setCartItems(response.data);
                //setFilteredProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCartItems();
    }, []);

    const removeFromCart = async (itemId) => {
        try {
            console.log(itemId)
            await axios.delete(`http://localhost:8090/cart/delete/${itemId}`);
            const updatedCartItems = cartItems.filter((item) => item.productID !== itemId);
            setCartItems(updatedCartItems);
            setSnackbarOpen(true);
        } catch (error) {
            alert('Error removing product from cart ' + error.message);
        }
    };

    const changeNumberOfUnits = async (action, itemId) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.productID === itemId) {
                let numberOfUnits = item.numberOfUnits;
                if (action === 'minus') {
                    numberOfUnits = Math.max(numberOfUnits - 1, 1);
                } else if (action === 'plus') {
                    numberOfUnits++;
                }
                const bill = item.productPrice * numberOfUnits;
                return {
                    ...item,
                    numberOfUnits,
                    bill,
                };
            }
            return item;
        });

        setCartItems(updatedCartItems);
    };

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.bill;
        });
        return total;
    };

    const handlePayment = () => {
        // Send the total amount to the payment portal
        const totalAmount = calculateTotal();
        // Add your code here to send the totalAmount to the payment portal
        console.log('Total Amount:', totalAmount);
        window.location.href = `/user/mnpayment?totalAmount=${totalAmount}`;
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Grid>
            <Typography variant="h4">
            </Typography>
            {cartItems.length === 0 ? (
                <Grid container alignItems="center" justify="center" style={{ height: '100vh' }}>
                    <Grid item>
                        <Typography variant="h6">YOUR CART IS EMPTY</Typography>
                    </Grid>
                </Grid>
            ) : (
                <><TableContainer component={Paper}>
                    <Table stickyHeader aria-label="cart table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Cost</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.itemId}>
                                    <TableCell align="center" component="th" scope="row">
                                        {item.productName}
                                    </TableCell>
                                    <TableCell align="center">RS {item.productPrice}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            style={{ borderRadius: '50%', width: '32px', height: '32px', minWidth: 'unset', marginRight: '8px' }}
                                            onClick={() => changeNumberOfUnits('minus', item.productID)}
                                        >
                                            -
                                        </Button>
                                        {item.numberOfUnits}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            style={{ borderRadius: '50%', width: '32px', height: '32px', minWidth: 'unset', marginLeft: '8px' }}
                                            onClick={() => changeNumberOfUnits('plus', item.productID)}
                                        >
                                            +
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">Rs. {item.bill}</TableCell>
                                    <TableCell align="center">
                                        <Button variant="outlined" color="secondary" onClick={() => removeFromCart(item.productID)}>
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Grid container direction="row" justify="space-between" alignItems="center" style={{ marginTop: '32px' }}>
                        <Grid item>
                            <Typography variant="h6">TOTAL AMOUNT: Rs. {calculateTotal()}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">TOTAL AMOUNT: Rs. {calculateTotal()}</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="inherit" onClick={handlePayment}>
                                Proceed to Payment
                            </Button>
                        </Grid>
                    </Grid>
                </>

            )}

            <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    Product removed from cart
                </Alert>
            </Snackbar>
            
        </Grid>
    );
};

export default Cart;