import React, { useState } from "react";
import { Box, Button, Grid, TextField, InputAdornment, useTheme, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
// import { useSelector } from 'react-redux';



const AddProducts = () => {

    const [productID, setPID] = useState("");
    const [productName, setPName] = useState("");
    const [productCategory, setPCategory] = useState("");
    const [productPrice, setPPrice] = useState("");
    const [productDescription, setPDescription] = useState("");
    const [productMFGDate, setPMFGDate] = useState("");
    const [productEXPDate, setPEXPDate] = useState("");
    const [image, setImage] = useState("");
    const [url, setURL] = useState("");

    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);

    const theme = useTheme();
    // const loggedUser = useSelector((state) => state.user)

    const onSubmitAddProducts = (event) => {
        event.preventDefault();

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mernpro")
        data.append("cloud_name", "dloxej4xv")

        const checkUrlAndUpdateProduct = () => {
            if (url === '') { // check if the url state is empty
                setTimeout(checkUrlAndUpdateProduct, 500); // wait for 0.5 second before checking again
            } else {
                const newProduct = {
                    productID: productID,
                    productName: productName,
                    productCategory: productCategory,
                    price: productPrice,
                    description: productDescription,
                    mfgDate: productMFGDate,
                    expDate: productEXPDate,
                    url: url
                };

                axios.post('http://localhost:8090/product/add', newProduct)
                    .then(() => {
                        setPID('');
                        setPName('');
                        setPCategory('');
                        setPPrice('');
                        setPDescription('');
                        setPMFGDate('');
                        setPEXPDate('');
                        setImage('');
                        setURL('');
                        //alert('Adding Successful!');
                        handleOpenSuccess();
                        window.location.href = '/admin/products'
                    })
                    .catch(err => {
                        //alert('Product adding failed! ' + err);
                        handleOpenError();
                    });
            }
        };

        fetch("https://api.cloudinary.com/v1_1/dloxej4xv/image/upload", {
            method: "POST",
            body: data
        })
            .then(response => response.json())
            .then(imageData => {
                setURL(imageData.url);
                checkUrlAndUpdateProduct();
            })
            .catch(err => {
                alert('Image uploading failed! ' + err);
            });
    };

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
            <form onSubmit={onSubmitAddProducts}>

                <Grid

                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    container spacing={2}
                    direction={"column"}

                >
                    <Grid item>
                        <TextField

                            id="id-input"
                            name="productID"
                            label="Product ID"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }}
                            required={true}
                            onChange={(e) => {
                                setPID(e.target.value);
                            }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="name-input"
                            name="productName"
                            label="Product Name"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }}
                            required={true}
                            onChange={(e) => {
                                setPName(e.target.value);
                            }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="category-input"
                            name="productCategory"
                            label="Product Category"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }}
                            required={true}
                            onChange={(e) => {
                                setPCategory(e.target.value);
                            }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="price-input"
                            name="productPrice"
                            label="Product Price"
                            type="text"
                            margin="normal"
                            startadornment={<InputAdornment position="start">Rs.</InputAdornment>}
                            sx={{ width: 300 }}
                            required={true}
                            onChange={(e) => {
                                setPPrice(e.target.value);
                            }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="description-input"
                            name="productDescription"
                            label="Product Description"
                            type="text"
                            margin="normal"
                            multiline
                            sx={{ width: 300 }}
                            required={true}
                            onChange={(e) => {
                                setPDescription(e.target.value);
                            }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="mfg-input"
                            name="productMFGDate"
                            helperText="Please select manufactured date"
                            type="date"
                            margin="normal"
                            sx={{ width: 300 }}
                            //required={true}
                            onChange={(e) => {
                                setPMFGDate(e.target.value);
                            }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="exp-input"
                            name="productEXPDate"
                            helperText="Please select expiration date"
                            type="date"
                            margin="normal"
                            sx={{ width: 300 }}
                            //required={true}
                            onChange={(e) => {
                                setPEXPDate(e.target.value);
                            }} />
                    </Grid>

                    <Grid item>
                        <TextField
                            label="Image"
                            type="file"
                            sx={{ width: 300 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => setImage(e.target.files[0])}
                            margin="normal"
                            required={true} />
                    </Grid>

                    <Grid item>
                        <Button variant="contained" margin="normal" color="primary" type="submit">Add</Button>
                    </Grid>

                </Grid>
            </form>

            <Snackbar open={openSuccess} autoHideDuration={4000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Product Adding Success!
                </Alert>
            </Snackbar>

            <Snackbar open={openError} autoHideDuration={4000} onClose={handleCloseSuccess} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Alert variant="filled" onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Product Adding Failed!
                </Alert>
            </Snackbar>

        </>

    )
}

export default AddProducts;