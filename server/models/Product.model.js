import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    productID: {
        type: String,
        required: true,
        unique: true
    },

    productName: {
        type: String,
        required: true
    },

    productCategory: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    mfgDate: {
        type: Date,
        //required: true
    },

    expDate: {
        type: Date,
        //required: true
    },

    url: {
        type: String,
        required: true 
    }

});

const Product = mongoose.model('Product', productSchema);

export default Product;
