import Booking from '../models/tourBookings'
import { sendMail } from '../services/mailer'
import { toSuccess } from '../utils'

export const createBooking = async (req, res) => {
  const { tourId, name, email, date, budget } = req.body

  try {
    const booking = await Booking.create({
      tourId,
      name,
      email,
      date,
      budget: budget > 0 ? budget : 0
    })

    const data = await Booking.findById(booking._id).populate('tourId')
    const { tourName, imagePath } = data.tourId

    await sendMail(email, 'booking', { tourName, name, date, email, imagePath }, "Request Delivered! We'll Get Back to You Soon! Thank You.")
    return toSuccess({ res, status: 201, data: booking, message: 'Booking created successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('tourId')
    return toSuccess({ res, data: bookings })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getBookingById = async (req, res) => {
  const { id } = req.params
  try {
    const booking = await Booking.findById(id).populate('tourId')
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    return toSuccess({ res, data: booking })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params
  const { status, name, email, body } = req.body
  try {
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true })
    await sendMail(email, 'plain', { name, body }, 'WellnessRoots - Tour Qutation')

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    return toSuccess({ res, status: 201, data: booking, message: 'Booking status updated successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const archiveBooking = async (req, res) => {
  const { id } = req.params

  try {
    const booking = await Booking.findByIdAndUpdate(id, { archived: true }, { new: true })
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    return toSuccess({ res, status: 201, data: booking, message: 'Booking archived successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteBooking = async (req, res) => {
  const { id } = req.params
  try {
    const booking = await Booking.findByIdAndDelete(id)
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }
    return toSuccess({ res, message: 'Booking deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
