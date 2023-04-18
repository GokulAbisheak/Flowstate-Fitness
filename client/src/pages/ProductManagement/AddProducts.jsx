import React, {useState} from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';
import axios from 'axios';


const AddProducts = () => {

    const [productID, setPID] = useState("");
    const [productName, setPName] = useState("");
    const [productCategory, setPCategory] = useState("");
    const [productPrice, setPPrice] = useState("");
    const [productDescription, setPDescription] = useState("");
    const [productMFGDate, setPMFGDate] = useState("");
    const [productEXPDate, setPEXPDate] = useState("");
    const [image, setImage] = useState([]);
    const [url, setURL] = useState([]);

    const theme = useTheme();

    const onSubmitAddProducts = (event) => {
        event.preventDefault();

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "mernpro")
        data.append("cloud_name", "dloxej4xv")
        fetch("https://api.cloudinary.com/v1_1/dloxej4xv/image/upload", {
            method:"POST",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setURL([...url, data.url])
        })
        .catch(err=>{
            console.log(err)
        })

        //Create new product object
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

        axios.post('http://localhost:8090/product/add', newProduct).then(() => {
            alert('Adding Successful!')
            window.location.href = '/product'

            setPID('');
            setPName('');
            setPCategory('');
            setPPrice('');
            setPDescription('');
            setPMFGDate('');
            setPEXPDate('');
            setImage('');
            setURL('');

        }).catch((err) => {
            alert('Product adding failed! ' + err)
        })
    };

    return (

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
                            setPID(e.target.value)
                        }}

                    />
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
                            setPName(e.target.value)
                        }}

                    />
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
                            setPCategory(e.target.value)
                        }}

                    />
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
                            setPPrice(e.target.value)
                        }}

                    />
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
                            setPDescription(e.target.value)
                        }}

                    />
                </Grid>

                <Grid item>
                    <TextField

                        id="mfg-input"
                        name="productMFGDate"
                        helperText="Please select manufactured date"
                        type="date"
                        margin="normal"
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setPMFGDate(e.target.value)
                        }}

                    />
                </Grid>

                <Grid item>
                    <TextField

                        id="exp-input"
                        name="productEXPDate"
                        helperText="Please select expiration date"
                        type="date"
                        margin="normal"
                        sx={{ width: 300 }}
                        required={true}
                        onChange={(e) => {
                            setPEXPDate(e.target.value)
                        }}

                    />
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
                        inputProps={{ multiple: true }}
                        margin="normal"
                        required={true}
                    />
                </Grid>

                <Grid item>
                    <Button variant="contained" margin="normal" color="primary" type="submit">Add</Button>
                </Grid>

            </Grid>
        </form>

    )
}

export default AddProducts;