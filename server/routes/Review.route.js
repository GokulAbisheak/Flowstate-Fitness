import express from 'express';
import ReviewController from '../controllers/Review.controller.js';

const reviewRouter = express.Router();

reviewRouter.get('/', ReviewController.getAllReviews);
//reviewRouter.get('/:email', ReviewController.getReviewById);
reviewRouter.post('/add', ReviewController.addReview);
reviewRouter.patch('/update/:id', ReviewController.updateReviewById);
reviewRouter.delete('/delete/:id', ReviewController.deleteReviewById);

export default reviewRouter;
