import Item from '../models/items'
import { toSuccess } from '../utils'

// Create a new Item
export const createItem = async (req, res) => {
  const { itemName, category, price, description, cuisine, location } = req.body
  let imagePath = ''

  if (req.file) {
    imagePath = `http://localhost:4000/item/image/${req.file.filename}`
  }

  try {
    const item = await Item.create({
      itemName,
      category,
      price,
      description,
      cuisine,
      location,
      imagePath
    })
    return toSuccess({ res, status: 201, data: item, message: 'Item created successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get all Items
export const getAllItems = async (req, res) => {
  try {
    const data = await Item.find()
    return toSuccess({ res, data, message: 'Items retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// Get a single Item
export const getItem = async (req, res) => {
  const { id } = req.params
  try {
    const data = await Item.findById(id)
    return toSuccess({ res, data, message: 'Item retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// update a tour
export const updateItem = async (req, res) => {
  const { id } = req.params
  const { itemName, category, price, description, cuisine, location } = req.body
  let imagePath = Item.findById(id).imagePath

  if (req.file) {
    imagePath = `http://localhost:4000/item/image/${req.file.filename}`
  }

  try {
    const data = await Item.findByIdAndUpdate(
      id,
      {
        itemName,
        category,
        price,
        description,
        cuisine,
        location,
        imagePath
      },
      {
        new: true
      }
    )
    return toSuccess({ res, status: 201, data, message: 'Item updated successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteItem = async (req, res) => {
  const { id } = req.params

  try {
    const data = await Item.findByIdAndDelete(id)
    return toSuccess({ res, status: 201, data, message: 'Item deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const searchItems = async (req, res) => {
  const { term } = req.params
  try {
    let items;
    if (term) {
      items = await Item.find({
        $or: [
          { itemName: { $regex: term, $options: 'i' } },
          { category: { $regex: term, $options: 'i' } },
        ]
      })
    } else {
      items = [] // Empty array when the search bar is empty
    }
    return toSuccess({ res, data: items, message: 'Items retrieved successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

