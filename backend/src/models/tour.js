import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema({
  tourName: {
    type: String,
    required: true
  },
  tourType: {
    type: String,
    enum: ['cultural', 'adventure', 'wildlife', 'camping', 'beach'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  }
})

const Tour = mongoose.model('Tour', tourSchema)

export default Tour
