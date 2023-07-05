import express from 'express'
import { createBooking, getAllBookings, getBookingById, updateBookingStatus, archiveBooking, deleteBooking } from '../controllers/tourBooking'

const router = express.Router()

router.post('/', createBooking)
router.get('/', getAllBookings)
router.get('/:id', getBookingById)
router.patch('/status/:id', updateBookingStatus)
router.patch('/archive/:id', archiveBooking)
router.delete('/:id', deleteBooking)

export default router
