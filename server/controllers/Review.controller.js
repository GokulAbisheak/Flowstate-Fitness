import Review from "../models/Review.model.js";
import logger from '../utilities/logger.js';

const ReviewController = {

  // Add a new review
  createReview: async (req, res) => {
    try {

      logger.info(req.body)
      const { text, author, rating } = req.body;

      const review = new Review({

        author,
        text,
        rating,

      });
      await review.save();
      res.status(201).json(review);
      logger.info("Product create successful");
    } catch (error) {
      res.status(400).json({ message: error.message });
      logger.error("review create failed");
    }
  },

  //Get all products
  getAllReviews: async (req, res) => {
    try {
      const review = await Review.find();
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error("Error getting all products");
    }
  },

  //Get all products
  getReviewsByEmail: async (req, res) => {
    try {
      const review = await Review.find({ author: req.params.email });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
      logger.error("Error getting all products");
    }
  },

  //Get products by id
  // getReviewById: async (req, res) => {
  //   try {
  //       const product = await Review.findOne({productID : req.params.productID});
  //       if (!product) {
  //           logger.error("Product " + req.params.productID + " not found");
  //           return res.status(404).json({ message: 'Product not found' });
  //       }
  //       res.status(200).json(product);
  //   } catch (error) {
  //       res.status(500).json({ message: error.message });
  //       logger.error("Error getting product " + req.params.productID);
  //         }
  //     },
  // Get all reviews
  getAllReviews: (req, res) => {
    Review.find()
      .then(reviews => res.json(reviews))
      .catch(err => res.status(400).json('Error: ' + err));
  },

  // Update a review
  updateReviewById: (req, res) => {
    Review.findById(req.params.id)
      .then(review => {
        review.text = req.body.text;
        review.author = req.body.author;
        review.rating = Number(req.body.rating);

        review.save()
          .then(() => res.json('Review updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  },

  // Update a review
  updateReviewByEmail: (req, res) => {
    Review.findOneAndUpdate({ author: req.params.email }, req.body)
      .then((res) => {
        console.log('Update Success')
      })
      .catch(err => res.status(400).json('Error: ' + err));
  },



  // Delete a review
  deleteReviewById: (req, res) => {
    Review.findByIdAndDelete(req.params.id)
      .then(() => res.json('Review deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  },

}

export default ReviewController;