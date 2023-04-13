import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    },

    membershipType: {
        type: String,
        required: true
    },

    expirationDate: {
        type: Date,
        required: true
    },
});

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;
