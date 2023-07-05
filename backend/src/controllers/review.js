import { toSuccess } from '../utils'
import Review from '../models/review'

// Create a new review
export const createReview = async (req, res) => {
  const { item, tour, user, user_id, text, rating } = req.body

  const date = new Date()
  try {
    const review = await Review.create({
      item,
      tour,
      user,
      user_id,
      date,
      text,
      rating
    })
    return toSuccess({ res, status: 201, data: review, message: 'Review created successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const data = await Review.find().populate('tour').populate('item').populate('user_details')
    return toSuccess({ res, data, message: 'Reviews retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get a single review
export const getReview = async (req, res) => {
  const { id } = req.params
  try {
    const data = await Review.findById(id).populate('tour').populate('item')
    return toSuccess({ res, data, message: 'Review retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// update a review
export const updateReview = async (req, res) => {
  const { id } = req.params
  const { user, user_id, text, rating } = req.body

  const date = new Date()
  try {
    const data = await Review.findByIdAndUpdate(
      id,
      {
        user,
        user_id,
        date,
        text,
        rating
      },
      {
        new: true
      }
    )
    return toSuccess({ res, status: 201, data, message: 'Review updated successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// delete a review
export const deleteReview = async (req, res) => {
  const { id } = req.params
  try {
    const data = await Review.findByIdAndDelete(id)
    return toSuccess({ res, status: 201, data, message: 'Review deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get reviews by user
export const getReviewsByUser = async (req, res) => {
  const { user_id } = req.params
  try {
    const data = await Review.find({ user_id })
    return toSuccess({ res, data, message: 'Reviews retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get reviews by rating
export const getReviewsByRating = async (req, res) => {
  const { rating } = req.params
  try {
    const data = await Review.find({ rating }).populate('tour').populate('item')
    return toSuccess({ res, data, message: 'Reviews retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
