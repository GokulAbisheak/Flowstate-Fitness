import React from "react";
import { Box, Button, Grid, Link, TextField, InputAdornment, useTheme } from '@mui/material';

const UpdateProducts = () => {
    return (

        <>
            <Grid display="flex" justifyContent="center"><h1>Update Product Details Here</h1></Grid>

            <form>

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
                            name="UpproductID"
                            label="Product ID"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="name-input"
                            name="UpproductName"
                            label="Product Name"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="category-input"
                            name="UpproductCategory"
                            label="Product Category"
                            type="text"
                            margin="normal"
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="price-input"
                            name="UpproductPrice"
                            label="Product Price"
                            type="text"
                            margin="normal"
                            startAdornment={<InputAdornment position="start">Rs.</InputAdornment>}
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="description-input"
                            name="UpproductDescription"
                            label="Product Description"
                            type="text"
                            margin="normal"
                            multiline
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="mfg-input"
                            name="UpproductMFGDate"
                            //label="MFG Date"
                            helperText="Please select manufactured date"
                            type="date"
                            margin="normal"
                            sx={{ width: 300 }} />
                    </Grid>

                    <Grid item>
                        <TextField

                            id="exp-input"
                            name="UpproductEXPDate"
                            //label="EXP Date"
                            helperText="Please select expiration date"
                            type="date"
                            margin="normal"
                            sx={{ width: 300 }} />
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
                            //onChange={handleImageChange}
                            inputProps={{ multiple: true }}
                            margin="normal" />
                    </Grid>

                    <Grid item>
                        <Button variant="contained" margin="normal" color="primary" type="submit">Update</Button>
                    </Grid>

                </Grid>

            </form>
            
        </>
    )
}

export default UpdateProducts;