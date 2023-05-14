import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    //required: true,
  },
  numberOfUnits: {
    type: Number,
    //default: 1,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;