import express from 'express'
import { upload } from '../config'
import { createTour, getAllTours, getTour, updateTour, deleteTour, searchTours } from '../controllers/tour'

const toursRouter = express.Router()

//add new destinations
toursRouter.post('/', upload.single('image'), createTour)
toursRouter.get('/', getAllTours)
toursRouter.get('/:id', getTour)
toursRouter.patch('/:id', updateTour)
toursRouter.delete('/:id', deleteTour)
toursRouter.get('/search/:term', searchTours)

export default toursRouter
