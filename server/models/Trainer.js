import mongoose from 'mongoose';
const schema = mongoose.schema;

const trainerSchema = new schema({
     firstName: {
         type: String,
         //backend validation 
         required: true
      },

     lastName: {
        type: String,
        //backend validation 
        required: true
     },

     age: {
        type: Number,
        required: true
     },
     gender: {
        type: String,
        required: true
     },

     address: {
        type: String,
        //backend validation 
        required: true
     },


})

const Trainer = mongoose.model("Trainer",trainerSchema );
 
export default Trainer;
