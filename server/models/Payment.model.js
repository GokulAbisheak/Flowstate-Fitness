import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({

    paymentID: {
        type: String,
        required: true,
        unique: true
    },

    paymentAmount: {
        type: Number,
        required: true
    },

    paymentDate: {
        type: Date,
        required: true
    },


    description: {
        type: String,
        required: true
    },
})

const Payment = mongoose.model('Payment' ,paymentSchema);

export default Payment;