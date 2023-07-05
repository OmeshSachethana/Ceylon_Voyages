import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  item: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Item'
  },
  user_details: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  tour: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: 'Tour'
  },
  user: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
})

const Review = mongoose.model('Review', reviewSchema)

export default Review
