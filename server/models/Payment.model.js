import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
//1
    paymentID: {
        type: String,
        required: true,
        unique: true
    },
//2
    paymentAmount: {
        type: Number,
        required: true
    },
//3
    paymentDate: {
        type: Date,
        required: true
    },
//4
    pDescription: {
        type: String,
        required: true
    },
//5
    pAddressl1: {
        type: String,
        required: true
    },
//6
    pAddressl2: {
        type: String,
        required: true
    },
//7
    pAddressl3: {
        type: String,
        required: true
    },
//8
    pState: {
        type: String,
        required: true
    },
//9
    pProvince: {
        type: String,
        required: true
    },
//10
    pZip: {
        type: Number,
        required: true
    },
//11
    pCountry: {
        type: String,
        required: true
    }
})

const Payment = mongoose.model('Payment' ,paymentSchema);

export default Payment;