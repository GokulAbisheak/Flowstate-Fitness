/* import React, {useState} from "react";
import { Grid } from "@mui/material";
import { useTheme } from '@mui/material';

const Cart = () => {

    const theme = useTheme();
    return(
        <Grid></Grid>
    )

}

export default Cart; */

import React, { useState } from 'react';
import axios from 'axios';

const Product = ({ productId }) => {
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    axios.post('/api/cart/add', {
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

  return (
    <div>
      <h2>Product Details</h2>
      <p>Product ID: {productId}</p>
      <label>Quantity:</label>
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;