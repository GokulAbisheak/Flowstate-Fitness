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
        trim: true,
        validate: {
            validator: function(v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },

    nic: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
          validator: function(v) {
            if (v.length === 10) {
              return /^[0-10]{9}[xXvV]$/.test(v);
            } else if (v.length === 12) {
              return /^[0-9]{12}$/.test(v);
            } else {
              return false;
            }
          },
          message: props => `${props.value} is not a valid NIC number! Please enter a OLD NIC number with 9 digits and an 'X' or 'V' at the end, or New NIC with 12 digits and all digits between 0-9.`
        }
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
