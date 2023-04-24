import mongoose from 'mongoose';

const financeSchema = new mongoose.Schema({

    salaryID: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },


    lastUpdated: {
        type: Date,
        required: true
    },

    salary: {
        type: Number,
        required: true
    },

    frequency: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true 
    }

   
});

const Finance = mongoose.model('Finance', financeSchema);

export default Finance;

