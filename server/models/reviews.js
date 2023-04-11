const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
