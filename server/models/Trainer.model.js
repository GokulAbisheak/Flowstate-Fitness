import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nic: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
          validator: function(v) {
            return /^07[0124-8]-\d{7}$/.test(v);
          },
          message: props => `${props.value} is not a valid phone number! Format should be 07x-xxxxxxx.`
        }
      },
    qualification: {
        type: String,
        required: true,
        trim: true 
    }
});

const Trainer = mongoose.model('Trainer', trainerSchema);

export default Trainer;
