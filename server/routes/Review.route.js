import express from 'express';
import ReviewController from '../controllers/Review.controller.js';

const reviewRouter = express.Router();

reviewRouter.get('/', ReviewController.getAllReviews);
reviewRouter.get('/:email', ReviewController.getReviewsByEmail);
reviewRouter.post('/add', ReviewController.createReview);
reviewRouter.patch('/update/:id', ReviewController.updateReviewById);
reviewRouter.patch('/update/email/:email', ReviewController.updateReviewByEmail);
reviewRouter.delete('/delete/:id', ReviewController.deleteReviewById);

export default reviewRouter;
