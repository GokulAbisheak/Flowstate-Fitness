import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

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

    password: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: Date,
    },

    phoneNumber: {
        type: String,
    },

    height: {
        type: Number
    },

    weight: {
        type: Number
    },

    flowTokens: {
        type: Number
    },

    type: {
        type: String
    },

    url: {
        type: String
    }
});

const User = mongoose.model('User', userSchema);

export default User;
