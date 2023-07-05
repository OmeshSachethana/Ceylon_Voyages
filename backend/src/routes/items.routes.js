import express from 'express'
import { upload } from '../config'
import { createItem, getAllItems, getItem, updateItem, deleteItem, searchItems } from '../controllers/item'

const itemsRouter = express.Router()

//add new hotels and restaurants
itemsRouter.post('/', upload.single('image'), createItem)
itemsRouter.get('/', getAllItems)
itemsRouter.get('/:id', getItem)
itemsRouter.patch('/:id', updateItem)
itemsRouter.delete('/:id', deleteItem)
itemsRouter.get('/search/:term', searchItems)

export default itemsRouter
