import mongoose from 'mongoose'

const tourBookingSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Tour'
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    budget: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending'
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

const Booking = mongoose.model('Booking', tourBookingSchema)

export default Booking
