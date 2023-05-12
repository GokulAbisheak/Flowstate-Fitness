import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
//1
    paymentID: {
        type: String,
        unique: true
    },
//2
    paymentAmount: {
        type: Number,
    },
//3
    paymentDate: {
        type: String,
    },
//4
    pDescription: {
        type: String,
    },
//5
    pAddressl1: {
        type: String,
    },
//6
    pAddressl2: {
        type: String,
    },
//7
    pAddressl3: {
        type: String,
    },
//8
    pState: {
        type: String,
    },
//9
    pProvince: {
        type: String,
    },
//10
    pZip: {
        type: Number,
    },
//11
    pCountry: {
        type: String,
    }
})

const Payment = mongoose.model('Payment' ,paymentSchema);

export default Payment;