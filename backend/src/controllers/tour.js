import Tour from '../models/tour'
import { toSuccess } from '../utils'
import dotenv from 'dotenv'

dotenv.config()
// deploy url
const baseUrl = process.env.BASE_URL || 'http://localhost:4000/'

// Create a new tour
export const createTour = async (req, res) => {
  const { tourName, tourType, description, duration } = req.body
  let imagePath = ''

  if (req.file) {
    imagePath = `${baseUrl}tour/image/${req.file.filename}`
  }

  try {
    const tour = await Tour.create({
      tourName,
      tourType,
      description,
      duration,
      imagePath
    })
    return toSuccess({ res, status: 201, data: tour, message: 'Tour created successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get all tours
export const getAllTours = async (req, res) => {
  try {
    const data = await Tour.find()
    return toSuccess({ res, data, message: 'Tours retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get a single tour
export const getTour = async (req, res) => {
  const { id } = req.params
  try {
    const data = await Tour.findById(id)
    return toSuccess({ res, data, message: 'Tour retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// update a tour
export const updateTour = async (req, res) => {
  const { id } = req.params
  const { tourName, tourType, description, duration } = req.body

  try {
    const data = await Tour.findByIdAndUpdate(
      id,
      {
        tourName,
        tourType,
        description,
        duration
      },
      {
        new: true
      }
    )
    return toSuccess({ res, status: 201, data, message: 'Tour updated successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteTour = async (req, res) => {
  const { id } = req.params

  try {
    const data = await Tour.findByIdAndDelete(id)
    return toSuccess({ res, status: 201, data, message: 'Tour deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const searchTours = async (req, res) => {
  const { term } = req.params
  try {
    const tours = await Tour.find({
      $or: [
        { tourName: { $regex: term, $options: 'i' } }, // Case-insensitive regex search on tourName
        { tourType: { $regex: term, $options: 'i' } }, // Case-insensitive regex search on tourType
        { description: { $regex: term, $options: 'i' } } // Case-insensitive regex search on description
      ]
    })
    return toSuccess({ res, data: tours, message: 'Tours retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
