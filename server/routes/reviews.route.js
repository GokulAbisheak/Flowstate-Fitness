const router = require('express').Router();
let Review = require('../models/reviews.model');

// Add a new review
router.route('/add').post((req, res) => {
  const text = req.body.text;
  const author = req.body.author;
  const rating = Number(req.body.rating);

  const newReview = new Review({
    text,
    author,
    rating
  });

  newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get all reviews
router.route('/').get((req, res) => {
    Review.find()
      .then(reviews => res.json(reviews))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  // Update a review
router.route('/update/:id').post((req, res) => {
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
  });

  // Delete a review
router.route('/:id').delete((req, res) => {
    Review.findByIdAndDelete(req.params.id)
      .then(() => res.json('Review deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;