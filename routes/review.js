const express = require("express");
const router = express.Router({ mergeParams: true });

const Review = require("../models/review.js");
const wrapAsync = require("../util/wrapAsync.js");
const ExpressError = require("../util/expressError.js");
const Listing = require("../models/listings.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/review.js");

//REVIEWS
//post review route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

//delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);

module.exports = router;
