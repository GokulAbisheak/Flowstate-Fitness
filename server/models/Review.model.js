import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const reviewSchema = new Schema({

  text: {
    type: String,
    required: true
  },

  author: {
    type: String,
    // required: true
  },

  rating: {
    type: Number,
    required: true
  },

  reply: {
    type: String
  }

}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
