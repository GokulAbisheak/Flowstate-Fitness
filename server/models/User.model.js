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
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    height: {
        type: Number
    },

    weight: {
        type: Number
    },

    flowTokens: {
        type: Number
    }
});

const User = mongoose.model('User', userSchema);

export default User;
