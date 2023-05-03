// import mongoose from 'mongoose';

// const cartSchema = new mongoose.Schema({

//     user: {
//         type: String, 
//         required: true, 
//         unique: true
//     },

//     cartItems: [{
//         productID: {
//             type: String, 
//             //ref: "Product", 
//             required: true
//         },

//         productName: {
//             type: String, 
//             //ref: "Product", 
//             required: true
//         },

//         quantity: {
//             type: Number, 
//             min: [1, 'Quantity can not be less then 1.'],
//             default: 1
//         },

//         price: {type: Number, required: true},

//         bill: {
//             type: Number,
//             required: true,
//             default: 0
//         }
//     }]
// }, {timestamps: true});

// const Cart = mongoose.model('Cart', cartSchema);

// export default Cart;

import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },

});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;