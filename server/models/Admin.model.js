import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    nic: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
