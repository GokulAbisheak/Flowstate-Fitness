import mongoose from 'mongoose';

const trainerapplSchema = new mongoose.Schema({
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
    },
    qualification: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
      }
});

const Trainerappl = mongoose.model('Trainerappl', trainerapplSchema);

export default Trainerappl;
